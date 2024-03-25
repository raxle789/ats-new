import sql from 'mssql';

enum errorCode {
    ELOGIN = 'ELOGIN',
    ETIMEOUT = 'ETIMEOUT',
    EALREADYCONNECTED = 'EALREADYCONNECTED',
    EALREADYCONNECTING = 'EALREADYCONNECTING',
    EINSTLOOKUP = 'EINSTLOOKUP',
    ESOCKET = 'ESOCKET'
};

type TypeServerConfig = {
    user: string;
    password: string;
    server: string;
    port?: number;
    domain?: string;
    database?: string;
    connectionTimeout?: number;
    requestTimeout?: number;
    stream?: boolean;
    parseJSON?: boolean;
    pool?: {
        max?: number;
        min?: number;
        idleTimeoutMillis?: number;
    },
    options: {
        encrypt: boolean;
    },
    arrayRowMode?: boolean;
};

const createPool = async (config: TypeServerConfig) => {
    try {
        const pool = new sql.ConnectionPool(config);
        const connectedPool = await pool.connect();
        return connectedPool;
    } catch (error: any) {
        /**
         * This will return the error code of the connection
         * @link https://github.com/tediousjs/node-mssql/tree/f09c23daa93e7bed101136f4ed7b60b9ae15005c?tab=readme-ov-file#connect-callback
         */
        return error.code;
    }
};

const getConnectionPool = (config: TypeServerConfig) => (new sql.ConnectionPool(config));

const pool = new sql.ConnectionPool({
    user: 'magang',
    password: 'Erajaya123**',
    server: '149.129.249.149',
    database: 'ATS',
    options: {
        encrypt: false,
    },
    pool: {
        min: 0,
        max: 20
    }
});

pool.connect((error) => {
    console.info('POOL FACED ERROR: ');
    console.info(error);
});

export { getConnectionPool, pool };
export default createPool;