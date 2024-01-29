/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import {randomString, randomIntBetween} from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

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

interface GeMetadata {
    tenant_id: number;
    ge_name: string;
    columns: string;
    indexes: string;
}

let scenarios = {
    insertData: {
        executor: 'ramping-vus',
        exec: 'insertData',
        startTime: '0m', // Start after 5 minutes
        startVUs: 0,
        stages: [
            {duration: '2m', target: 50}, // Ramp up to 50 VUs over the first 5 minutes
            {duration: '2m', target: 25} // Ramp down to  25 VUs for the next 10 minutes
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
    let checkTableQuery = `SELECT COUNT(*) AS table_exists
                           FROM information_schema.tables
                           WHERE table_schema = 'test'
                             AND table_name = 'ge_metadata';`;

    let res = sql.query(db, checkTableQuery);
    if (res[0].table_exists === 0) {
        throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
    } else {
        console.log("Table 'ge_metadata' exists. Proceeding with the script.");
    }
    // Below section is not working, currently hardcoding this
    // let rowCountQuery = `SELECT AUTO_INCREMENT
    //                      FROM information_schema.tables
    //                      WHERE table_schema = 'test'
    //                        AND table_name = 'ge_metadata';`;
    // let rowCountResult = sql.query(db, rowCountQuery);
    // let rowCount = rowCountResult[0].AUTO_INCREMENT[0];
    let rowCount:number = parseInt(geCount, 10  );
    // Additional setup logic, if any...
    return {rowCount};
}

// Teardown function
export function teardown() {
    db.close();
}

function readGeData(id: number): GeMetadata[] {
    let query = `SELECT tenant_id, ge_name, columns, indexes
                 FROM ge_metadata
                 where id = ${id};`;
    let resultSet = sql.query(db, query);
    let geData: GeMetadata[] = [];

    for (let row of resultSet) {
        geData.push({
            tenant_id: parseInt(String.fromCharCode(...row.tenant_id), 10),
            ge_name: String.fromCharCode(...row.ge_name),
            columns: String.fromCharCode(...row.columns),
            indexes: String.fromCharCode(...row.indexes)
        });
    }

    return geData;
}


// Function to generate the SQL query for inserting data
function generateInsertQuery(tenantId: number, geName: string, columns: string): string {
    let cols: string[] = [];
    let values: string[] = [];

    columns.split(SPLIT).forEach(colDef => {
        let [colName, colType] = colDef.trim().split(' ');
        cols.push(colName);
        values.push(
            colType === 'VARCHAR(255)' ? `'${randomString(16)}'` :
                colType === 'INT' ? randomIntBetween(1, 10000).toString() :
                    'NOW(3)'  // Default value for other types
        );
    });

    return `INSERT INTO tenant_${tenantId}_${geName} (${cols.join(SPLIT)})
            VALUES (${values});`;
}


// Function to insert data into a GE table
export function insertData(data: { rowCount: number }) {
    // Randomly select a GE metadata record
    const randomID = randomIntBetween(1, data.rowCount);
    let {tenant_id, ge_name, columns}: GeMetadata = readGeData(randomID)[0];
    let insertQuery = generateInsertQuery(tenant_id, ge_name, columns);
    try {
        db.exec(insertQuery);
        inserts.add(1);
    } catch (error) {
        console.error(`Error executing insert query: ${error}`);
        console.error(`Failed SQL: ${insertQuery}`);
    }
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