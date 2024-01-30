/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import {randomIntBetween} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import exec from 'k6/execution';
import {Counter} from 'k6/metrics';

// Database connection setup
const dbHost = __ENV.DB_HOST || "10.0.132.214";
const dbPort = __ENV.DB_PORT || "4000";
const dbName = __ENV.DB_NAME || "test";
const dbUser = __ENV.DB_USER || "root";
const dbPassword = __ENV.TIDB_PASSWORD || "password";

const connectionString = `${dbUser}:${dbPassword}@tcp(${dbHost}:${dbPort})/${dbName}?tls=skip-verify`;
const db = sql.open('mysql', connectionString);
const tables = new Counter('total_tables');
const types = ['VARCHAR(255)', 'BIGINT', 'DATETIME(5)'];

let scenarios = {
    createGE: {
        executor: 'ramping-vus',
        exec: 'createGE',
        startVUs: 20,
        startTime: '0',
        stages: [
            {duration: '2m', target: 50}, // Stay at 50 VUs for the first 5 minutes
            {duration: '4m', target: 50}, // Reduce to 20 VUs over the next 10 minutes
            {duration: '2m', target: 20}   // Further reduce to 10 VUs for the last 5 minutes
        ],
        gracefulRampDown: '30s',
    }
};

// Options configuration
export const options = {
    discardResponseBodies: true,
    scenarios: scenarios,
};

// Type guard to check if the error is a DBError
function isDBError(error: unknown): error is DBError {
    return (error as DBError).value !== undefined;
}

export function setup() {
    // FIXME: this will cause hotspot and uneven spread on region servers due to auto increment
    db.exec(`CREATE TABLE IF NOT EXISTS test.ge_metadata
             (
                 id        INT AUTO_INCREMENT PRIMARY KEY,
                 tenant_id INT          NOT NULL,
                 ge_name   VARCHAR(255) NOT NULL,
                 columns   JSON         NOT NULL,
                 indexes   JSON         NOT NULL
             ) AUTO_ID_CACHE 1;`);
}

// Teardown function
export function teardown() {
    db.close();
}

// Function to generate random columns
function generateRandomColumns(): Column[] {
    let columns: Column[] = [];
    let numCols = randomIntBetween(3, 10); // Generate between 3 to 10 columns
    let columnNames = new Set<string>(); // To track unique column names

    // Ensure the first column (primary key) is either VARCHAR(255) or BIGINT with skew 80% bigint
    let primaryType = randomIntBetween(0, 9) > 7 ? 'VARCHAR(255)' : 'BIGINT';
    let primaryColName = `col_${randomIntBetween(1000, 9999)}`;
    columns.push({ name: primaryColName, type: primaryType });
    columnNames.add(primaryColName);

    // Generate the rest of the columns
    while (columns.length < numCols) {
        let type = types[randomIntBetween(0, types.length - 1)];
        let colName = `col_${randomIntBetween(1000, 9999)}`;

        // Ensure the column name is unique
        if (!columnNames.has(colName)) {
            columns.push({ name: colName, type: type });
            columnNames.add(colName);
        }
    }
    return columns;
}

// Function to select random indexes from the columns
function selectRandomIndexes(columns: Column[], maxIndexes: number): Column[] {
    let selectedIndexes = new Set<Column>(); // To keep track of selected indexes
    while (selectedIndexes.size < Math.min(maxIndexes, columns.length)) {
        const randomIndex = randomIntBetween(0, columns.length - 1);
        selectedIndexes.add(columns[randomIndex]);
    }
    return Array.from(selectedIndexes);
}

// Create GE scenario
export function createGE(): void {
    const tenantId = 1 + exec.vu.idInTest;
    const geName = `ge_${exec.vu.iterationInScenario}`;
    const columns = generateRandomColumns();
    const [primaryKeyCol, ...otherColumns] = columns;
    const indexes = selectRandomIndexes(otherColumns, 2);  // Select up to 2 columns for indexing
    const createTableSQL = `CREATE TABLE tenant_${tenantId}_${geName}
    (
        ${primaryKeyCol.name}
        ${primaryKeyCol.type === 'BIGINT' ? 'BIGINT AUTO_RANDOM' : primaryKeyCol.type}
        ${otherColumns.map(({name, type}) => `, ${name} ${type}`).join('')},
        PRIMARY KEY ( ${primaryKeyCol.name} )
        );`;
    const insertMetaSQL = `INSERT INTO ge_metadata (tenant_id, ge_name, columns, indexes)
                           VALUES (${tenantId}, '${geName}',
                                   '${JSON.stringify(columns)}',
                                   '${JSON.stringify(indexes)}');`

    // Create table
    try {
        db.exec(createTableSQL);
        // Create indexes
        indexes.forEach(indexCol => {
            let createIndexSQL = `CREATE INDEX IF NOT EXISTS idx_${indexCol.name} ON tenant_${tenantId}_${geName} (${indexCol.name});`;
            try {
                db.exec(createIndexSQL);
            } catch (error) {
                console.error(`Error creating index on column ${indexCol.name} for tenant_${tenantId}_${geName}: ${error}`);
                console.error(`Failed SQL: ${createIndexSQL}`);
            }
        });

        // Insert metadata
        try {
            db.exec(insertMetaSQL);
            tables.add(1);
            console.log(`Table tenant_${tenantId}_${geName} created successfully`);
        } catch (error) {
            console.error(`Error inserting metadata for tenant_${tenantId}_${geName}: ${error}`);
            console.error(`Failed SQL: ${insertMetaSQL}`);
        }
    } catch (error) {
        if (isDBError(error) && error.value.number != 1050) {
            console.error(`Error creating table tenant_${tenantId}_${geName}: ${error}`);
            console.error(`Failed SQL: ${createTableSQL}`);
            return; // Exit the function if table creation fails
        }
    }
}

/* 
Result

data_received........: 0 B 0 B/s
data_sent............: 0 B 0 B/s
iteration_duration...: avg=51.16s min=68.45µs med=57.7s max=1m12s p(90)=1m7s p(95)=1m9s
iterations...........: 230 0.602096/s
total_tables.........: 230 0.602096/s
vus..................: 0   min=0      max=50
vus_max..............: 50  min=50     max=50


DB side avg create 

*/