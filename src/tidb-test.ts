/* @ts-ignore */
import sql from 'k6/x/sql';
import { createGE } from './tidb-createGE-test';
import { insertData } from './tidb-insertData-test';
import { readData } from './tidb-readData-test';
import { readJoinData } from './tidb-joinData-test';

// Database connection setup
const dbHost = __ENV.DB_HOST || "gateway01.ap-southeast-1.prod.aws.tidbcloud.com";
const dbPort = __ENV.DB_PORT || "4000";
const dbName = __ENV.DB_NAME || "test";
const dbUser = __ENV.DB_USER || "gL64LSe6ggDbrgk.root";
const dbPassword = __ENV.DB_PASSWORD || "password";
const connectionString = `${dbUser}:${dbPassword}@tcp(${dbHost}:${dbPort})/${dbName}?tls=skip-verify`;
const db = sql.open('mysql', connectionString);

// Scenarios configuration
/*  Create     Insert     Read      Read with Join
0   50           0          0           0
5   20          50          0           0
10  10          50          40          0
15  0           0           50          50
*/

let scenarios = {
    createGE: {
        executor: 'ramping-vus',
        exec: 'createGE',
        startVUs: 50,
        stages: [
            { duration: '10s', target: 50 }, // Stay at 50 VUs for the first 5 minutes
            { duration: '20s', target: 20 }, // Reduce to 20 VUs over the next 10 minutes
            { duration: '10s', target: 10 }   // Further reduce to 10 VUs for the last 5 minutes
        ],
        gracefulRampDown: '30s',
    },
    insertData: {
        executor: 'ramping-vus',
        exec: 'insertData',
        startTime: '1m', // Start after 5 minutes
        startVUs: 0,
        stages: [
            { duration: '1m', target: 50 }, // Ramp up to 50 VUs over the first 5 minutes
            { duration: '1m', target: 25 } // Ramp down to  25 VUs for the next 10 minutes
        ],
        gracefulRampDown: '30s',
    },
    readData: {
        executor: 'ramping-vus',
        exec: 'readData',
        startTime: '2m', // Start after 10 minutes
        startVUs: 0,
        stages: [
            { duration: '2m', target: 40 }, // Ramp up to 40 VUs over the first 5 minutes
            { duration: '4m', target: 50 }  // Stay at 50 VUs for the next 5 minutes
        ],
        gracefulRampDown: '30s',
    },
    readJoinData: {
        executor: 'ramping-vus',
        exec: 'readJoinData',
        startTime: '4m', // Start after 15 minutes
        startVUs: 0,
        stages: [
            { duration: '2m', target: 50 }  // Ramp up to 50 VUs over 5 minutes
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
    // Additional setup logic...
}

// Teardown function
export function teardown() {
    db.close();
}

export { createGE, insertData, readData, readJoinData };
