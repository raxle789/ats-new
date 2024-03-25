import { Request } from './../../../node_modules/@types/tedious/index.d';
import mssql from 'mssql';
import createPool, { getConnectionPool } from "./init";

const _SERVER_CONFIG = {
        user: 'magang',
        password: 'Erajaya123**',
        server: '149.129.249.149',
        database: 'ATS',
        pool: {
        max: 20,
        min: 0
        },
        options: {
        encrypt: false,
        }
    };

const pool = async () => await createPool(_SERVER_CONFIG);

export { pool };