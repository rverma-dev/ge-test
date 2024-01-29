/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';

const SPLIT = ', ';
// Database connection setup
const dbHost = __ENV.DB_HOST || "10.0.132.214";
const dbPort = __ENV.DB_PORT || "4000";
const dbName = __ENV.DB_NAME || "test";
const dbUser = __ENV.DB_USER || "root";
const dbPassword = __ENV.TIDB_PASSWORD || "password";

const connectionString = `${dbUser}:${dbPassword}@tcp(${dbHost}:${dbPort})/${dbName}?tls=skip-verify`;
const db = sql.open('mysql', connectionString);
const tables = new Counter('total_tables');

let scenarios = {
    createGE: {
        executor: 'ramping-vus',
        exec: 'createGE',
        startVUs: 20,
        startTime: '0',
        stages: [
            { duration: '1m', target: 50 }, // Stay at 50 VUs for the first 5 minutes
            { duration: '4m', target: 20 }, // Reduce to 20 VUs over the next 10 minutes
            { duration: '1m', target: 10 }   // Further reduce to 10 VUs for the last 5 minutes
        ],
        gracefulRampDown: '30s',
    }
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

// Options configuration
export const options = {
    discardResponseBodies: true,
    scenarios: scenarios,
};

export function setup() {
    db.exec(`CREATE TABLE IF NOT EXISTS test.ge_metadata (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tenant_id INT NOT NULL,
        ge_name VARCHAR(255) NOT NULL,
        columns TEXT NOT NULL,
        indexes TEXT NOT NULL
    );`);
}

// Teardown function
export function teardown() {
    db.close();
}

interface DBError {
    value: {
        number: number;
    };
}

// Type guard to check if the error is a DBError
function isDBError(error: unknown): error is DBError {
    return (error as DBError).value !== undefined;
}

// Function to generate random columns
function generateRandomColumns(): string[] {
    const types = ['VARCHAR(255)', 'INT', 'DATETIME(3)'];
    let columns = [];
    let numCols = randomIntBetween(3, 10); // Generate between 3 to 10 columns
    let columnNames = new Set(); // To track unique column names

    while (columns.length < numCols) {
        let type = types[randomIntBetween(0, types.length - 1)];
        let colName = `col_${randomIntBetween(1000, 9999)}`;

        // Ensure the column name is unique
        if (!columnNames.has(colName)) {
            columns.push(`${colName} ${type}`);
            columnNames.add(colName); // Add to the set of known names
        }
    }

    return columns;
}

// Function to select random indexes from the columns
function selectRandomIndexes(columns: string[], maxIndexes: number): string[] {
    let columnNames = columns.map(col => col.split(' ')[0]);
    let selectedIndexes = new Set(); // To keep track of selected indexes
    let indexes = [];

    // Adjust to exclude primary key column (assuming it's the first column)
    columnNames.shift();

    while (indexes.length < Math.min(maxIndexes, columnNames.length)) {
        let randomIndex = randomIntBetween(0, columnNames.length - 1);
        let indexName = columnNames[randomIndex];

        // Check if already selected, if not, add to the indexes array
        if (!selectedIndexes.has(indexName)) {
            indexes.push(indexName);
            selectedIndexes.add(indexName);
        }
    }

    return indexes;
}

// Create GE scenario
export function createGE(): void {
    const tenantId = 1 + exec.vu.idInTest;
    const geName = `ge_${exec.vu.iterationInScenario}`;
    const columns = generateRandomColumns();
    const indexes = selectRandomIndexes(columns, 2); // Select up to 2 columns for indexing
    let primaryKeyCol = columns[0].split(' ')[0]; // Use the first column as the primary key
    let createTableSQL = `CREATE TABLE tenant_${tenantId}_${geName} (${columns.join(SPLIT)}, PRIMARY KEY (${primaryKeyCol}));`;
    let insertMetaSQL = `INSERT INTO ge_metadata (tenant_id, ge_name, columns, indexes) VALUES (${tenantId},'${geName}','${columns.join(SPLIT)}','${indexes.join(SPLIT)}');`

    // Create table
    try {
        db.exec(createTableSQL);
        console.log(`Table tenant_${tenantId}_${geName} created successfully`);

        // Create indexes
        indexes.forEach(indexCol => {
            let createIndexSQL = `CREATE INDEX IF NOT EXISTS idx_${indexCol} ON tenant_${tenantId}_${geName} (${indexCol});`;
            try {
                db.exec(createIndexSQL);
                console.log(`Index created successfully on column: ${indexCol}`);
            } catch (error) {
                console.error(`Error creating index on column ${indexCol} for tenant_${tenantId}_${geName}: ${error}`);
                console.error(`Failed SQL: ${createIndexSQL}`);
            }
        });

        // Insert metadata
        try {
            db.exec(insertMetaSQL);
            tables.add(1);
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