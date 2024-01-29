/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import { randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

import { Counter } from 'k6/metrics';

// Database connection setup
const dbHost = __ENV.DB_HOST || "10.0.132.214";
const dbPort = __ENV.DB_PORT || "4000";
const dbName = __ENV.DB_NAME || "test";
const dbUser = __ENV.DB_USER || "root";
const dbPassword = __ENV.TIDB_PASSWORD || "password";

const connectionString = `${dbUser}:${dbPassword}@tcp(${dbHost}:${dbPort})/${dbName}?tls=skip-verify`;
const db = sql.open('mysql', connectionString);

const reads = new Counter('rows_reads');
const SPLIT = ', ';

interface GeMetadata {
    tenant_id: number;
    ge_name: string;
    columns: string;
    indexes: string;
}

let scenarios = {
    readData: {
        executor: 'ramping-vus',
        exec: 'readData',
        startTime: '6m', // Start after 10 minutes
        startVUs: 50,
        stages: [
            { duration: '2m', target: 50 }, // Ramp up to 40 VUs over the first 5 minutes
            { duration: '2m', target: 80 }  // Stay at 50 VUs for the next 5 minutes
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

    let res = sql.query(db,checkTableQuery);
    if (res[0].table_exists === 0) {
        throw new Error("Table 'ge_metadata' does not exist. Terminating the script.");
    } else {
        console.log("Table 'ge_metadata' exists. Proceeding with the script.");
    }
    // Additional setup logic, if any...
}

// Teardown function
export function teardown() {
    db.close();
}

function readGeData(limit: number): GeMetadata[] {
    let query = `SELECT tenant_id, ge_name, columns, indexes FROM ge_metadata ORDER BY RAND() LIMIT ${limit};`;
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

// Function to read data from a GE table with different types of queries
export function readData() {
    // Randomly select a GE metadata record
    let { tenant_id, ge_name, columns, indexes }: GeMetadata = readGeData(1)[0];

    let cols: string[] = [];
    let defaultValueMap = new Map<string, string>(); // Map to store default values for each column
    let indx = indexes.split(SPLIT);

    columns.split(SPLIT).forEach(colDef => {
        let [colName, colType] = colDef.trim().split(' ');
        cols.push(colName);
        let defaultValue = colType === 'VARCHAR(255)' ? `'${randomString(16)}'` :
                           colType === 'INT' ? randomIntBetween(1, 10000).toString() :
                           'NOW(3)'; // Default value for other types
        defaultValueMap.set(colName, defaultValue);
    });

    let nonIndexedCols = cols.filter(col => !indx.includes(col));
    let queryType = randomIntBetween(1, 3); // Randomly choose query type
    let readQuery;

    switch (queryType) {
        case 1: // Queries using indexes
            let randomCol = indx[randomIntBetween(0, indx.length - 1)];
            let defaultValue = defaultValueMap.get(randomCol);
            readQuery = `SELECT * FROM tenant_${tenant_id}_${ge_name} WHERE ${randomCol} = ${defaultValue} LIMIT 10;`;
            break;
        case 2: // Queries without indexes
            let randomCol2 = nonIndexedCols[randomIntBetween(0, nonIndexedCols.length - 1)];
            let defaultValue2 = defaultValueMap.get(randomCol2);
            readQuery = `SELECT * FROM tenant_${tenant_id}_${ge_name} WHERE ${randomCol2} = ${defaultValue2} LIMIT 10;`;
            break;
        default: // Mixed queries
            let randomIndexedCol = indx[randomIntBetween(0, indx.length - 1)];
            let randomNonIndexedCol = nonIndexedCols[randomIntBetween(0, nonIndexedCols.length - 1)];
            let defaultValueIndexed = defaultValueMap.get(randomIndexedCol);
            readQuery = `SELECT * FROM tenant_${tenant_id}_${ge_name} WHERE ${randomIndexedCol} = ${defaultValueIndexed} AND ${randomNonIndexedCol} IS NOT NULL LIMIT 10;`;
            break;
    }

    try {
        console.log(readQuery);
        let response = db.query(readQuery);
        if (response != null){
            console.log(`Read query type ${queryType} executed successfully`);
            reads.add(1);
        }
    } catch (error) {
        console.error(`Error executing read query type ${queryType}: ${error}`);
    }
}

/* 
Results

data_received........: 0 B  0 B/s
data_sent............: 0 B  0 B/s
iteration_duration...: avg=3.54s min=116.87µs med=374.66ms max=1m38s p(90)=1.44s p(95)=31.67s
iterations...........: 4279 6.774115/s
rows_reads...........: 3962 6.27227/s
vus..................: 4    min=0      max=79
vus_max..............: 80  

1. Unresponsive at 65-70, with constant timeouts

*/