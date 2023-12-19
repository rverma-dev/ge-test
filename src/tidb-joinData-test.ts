/* @ts-ignore */
import sql from 'k6/x/sql';
/* @ts-ignore */
import { randomString, randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

import { Counter } from 'k6/metrics';

// Database connection setup
const db = sql.open('mysql', 'gL64LSe6ggDbrgk.root:password@tcp(gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000)/test?tls=skip-verify');
const reads = new Counter('join_reads');

interface GeMetadata {
    tenant_id: number;
    ge_name: string;
    columns: string;
    indexes: string;
}

let scenarios = {
    readJoinData: {
        executor: 'ramping-vus',
        exec: 'readJoinData',
        startTime: '0m', // Start after 15 minutes
        startVUs: 0,
        stages: [
            { duration: '5m', target: 50 }  // Ramp up to 50 VUs over 5 minutes
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

function splitColumnsAndIndexes(metadata: GeMetadata): { cols: string[], indexes: string[] } {
    const cols = metadata.columns.split(',').map(col => col.trim().split(' ')[0]);
    const indexes = metadata.indexes.split(',').map(index => index.trim());
    return { cols, indexes };
}

function generateJoinQuery(metadata1: GeMetadata, metadata2: GeMetadata, joinType: number): string {
    const { cols: cols1, indexes: indexes1 } = splitColumnsAndIndexes(metadata1);
    const { cols: cols2, indexes: indexes2 } = splitColumnsAndIndexes(metadata2);

    let joinCol1: string, joinCol2: string;
    switch (joinType) {
        case 1: // Join between indexed and indexed columns
            joinCol1 = indexes1[randomIntBetween(0, indexes1.length - 1)];
            joinCol2 = indexes2[randomIntBetween(0, indexes2.length - 1)];
            break;
        case 2: // Join between indexed and non-indexed columns
            joinCol1 = indexes1[randomIntBetween(0, indexes1.length - 1)];
            if (!joinCol1) {
                break;
            }
            joinCol2 = cols2.filter(col => !indexes2.includes(col))[randomIntBetween(0, cols2.length - 1)];
            break;
        default: // Join between two non-indexed columns
            joinCol1 = cols1.filter(col => !indexes1.includes(col))[randomIntBetween(0, cols1.length - 1)];
            joinCol2 = cols2.filter(col => !indexes2.includes(col))[randomIntBetween(0, cols2.length - 1)];
            break;
    }

    return `SELECT * FROM tenant_${metadata1.tenant_id}_${metadata1.ge_name} a JOIN tenant_${metadata2.tenant_id}_${metadata2.ge_name} b ON a.${joinCol1} = b.${joinCol2} LIMIT 10;`;
}

export function readJoinData() {
    let [metadata1, metadata2] = readGeData(2);
    if (!metadata1 || !metadata2) {
        console.error('Insufficient GE metadata found for join reading');
        return;
    }

    let queryType = Math.random() < 0.5 ? 1 : (Math.random() < 0.67 ? 2 : 3); // Randomly choose query type
    let joinQuery = generateJoinQuery(metadata1, metadata2, queryType);

    try {
        let response = db.query(joinQuery);
        if (response != null) {
            console.log(`Read query type ${queryType} executed successfully`);
            reads.add(1);
        }
    } catch (error) {
        console.error(`Error executing join read query type ${queryType}: ${error}`);
    }
}

