/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import {randomIntBetween, randomString} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import {Counter} from 'k6/metrics';

// Database connection setup
const dbHost = __ENV.DB_HOST || "10.0.132.214";
const dbPort = __ENV.DB_PORT || "4000";
const dbName = __ENV.DB_NAME || "test";
const dbUser = __ENV.DB_USER || "root";
const dbPassword = __ENV.TIDB_PASSWORD || "password";
const geCount = __ENV.GE_COUNT || "115";

const connectionString = `${dbUser}:${dbPassword}@tcp(${dbHost}:${dbPort})/${dbName}?tls=skip-verify`;
const db = sql.open('mysql', connectionString);
const inserts = new Counter('rows_inserts');
const SPLIT = ', ';
const MetaTableExistsQuery = `SELECT COUNT(*) AS table_exists FROM information_schema.tables  WHERE table_schema = 'test' AND table_name = 'ge_metadata';`;
const MetaCountQuery = `SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_schema = 'test' AND table_name = 'ge_metadata';`;

let scenarios = {
    insertData: {
        executor: 'ramping-vus',
        exec: 'insertData',
        startTime: '0m', // Start after 5 minutes
        startVUs: 50,
        stages: [
            {duration: '5m', target: 100}, // Ramp up to 50 VUs over the first 5 minutes
            {duration: '5m', target: 100}, // Ramp up to 50 VUs over the first 5 minutes
            {duration: '5m', target: 50} // Ramp down to  25 VUs for the next 10 minutes
        ],
        gracefulRampDown: '30s',
    },
};

// Options configuration
export const options = {
    discardResponseBodies: true,
    scenarios: scenarios,
};

export function setup() {
    let res = sql.query(db, MetaTableExistsQuery);
    let rowCount = parseInt(String.fromCharCode(res[0]["table_exists"]));
    console.log(rowCount);
    if (res[0].table_exists === 0) {
        throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
    } else {
        console.log("Table 'ge_metadata' exists. Proceeding with the script.");
        let res = sql.query(db, MetaCountQuery);
        let rowCount = parseInt(String.fromCharCode(...res[0]["AUTO_INCREMENT"], 10));
        return {rowCount};
    }
}

// Teardown function
export function teardown() {
    db.close();
}

function getRandomValueForType(type: string) {
    switch (type) {
        case 'VARCHAR(255)':
            return `'${randomString(16)}'`;
        case 'BIGINT':
            return randomIntBetween(1, 10000).toString();
        default:
            return 'NOW(5)';
    }
}

// Function to insert data into a GE table
export function insertData(data: { rowCount: number }) {
    let geData = readGeData(data.rowCount);
    let insertQuery = generateInsertQuery(geData.tenant_id, geData.ge_name, geData.columns);
    try {
        db.exec(insertQuery);
        inserts.add(1);
    } catch (error) {
        console.error(`Error executing insert query: ${error}`);
        console.error(`Failed SQL: ${insertQuery}`);
    }
}

function readGeData(id: number): GeMetadata {
    const randomID = randomIntBetween(1, id);
    let query = `SELECT tenant_id, ge_name, columns, indexes FROM ge_metadata where id = ${randomID};`;
    let resultSet = sql.query(db, query);
    return {
        tenant_id: parseInt(String.fromCharCode(...resultSet[0]["tenant_id"]), 10),
        ge_name: String.fromCharCode(...resultSet[0]["ge_name"]),
        columns: JSON.parse(String.fromCharCode(...resultSet[0]["columns"])),
        indexes: JSON.parse(String.fromCharCode(...resultSet[0]["indexes"]))
    };
}

// Function to generate the SQL query for inserting data
function generateInsertQuery(tenantId: number, geName: string, columns: Column[]): string {
    let cols: string[] = [];
    let values: string[] = [];

    const [primaryKeyCol, ...otherColumns] = columns;
    if (primaryKeyCol.type !== 'BIGINT') {
        cols.push(primaryKeyCol.name);
        values.push(getRandomValueForType(primaryKeyCol.type));
    }
    otherColumns.forEach(col => {
        cols.push(col.name);
        values.push(getRandomValueForType(col.type));
    });
    return `INSERT INTO tenant_${tenantId}_${geName} (${cols.join(SPLIT)}) VALUES (${values.join(SPLIT)});`;
}


/*
Result

data_received........: 0 B   0 B/s
data_sent............: 0 B   0 B/s
iteration_duration...: avg=118.81ms min=115.7µs med=111.18ms max=2.21s p(90)=132.32ms p(95)=149.11ms
iterations...........: 63142 150.1965/s
rows_inserts.........: 62799 149.380602/s
vus..................: 26    min=0        max=50
vus_max..............: 50    min=50       max=50

*/