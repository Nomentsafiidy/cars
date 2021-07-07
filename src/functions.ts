import * as mysql from 'mysql';
import * as bcrypt from 'bcrypt';

let __connection: mysql.Connection = null;

/**
 * Create a database connection
 * Use getConnection to get a "static" connection
 * @return (mysql.Connection)
 */
export function createConnection(): mysql.Connection {
    const connectionOpts = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    };
    // Logger.log('[function - createConnection] connectionOpts:', connectionOpts);
    const connection = mysql.createConnection(connectionOpts);
    return connection;
}

/**
 * Get database connection
 * @return (mysql.Connection)
 */
export function getConnection(): mysql.Connection {
    if (__connection == null) {
        __connection = this.createConnection();
        __connection.on('error', (err) => {
            // Reset connection to db if connection is lost
            __connection = null;
        });
    }
    return __connection;
}

/**
 * End Connection
 * @param force: (boolean)(default: true) force connection destruction
 */
export function endConnection(force: boolean = true) {
    if (__connection) {
        if (force) {
            __connection.destroy();
            __connection = null;
            // Logger.log('[endConnection] destroy, __connection:', __connection);
        } else {
            __connection.end();
            __connection = null;
        }
    }
}

/**
 *
 * @param passwordPlain
 * @param passwordEncrypted
 * @returns (Promise<boolean>)
 */
export async function checkPassword(passwordPlain: string, passwordEncrypted: string): Promise<boolean> {
    return bcrypt.compare(passwordPlain, passwordEncrypted);
}

/**
 *
 * @param passwordPlain
 * @returns (Promise<string>)
 */
export async function hashPassword(passwordPlain: string): Promise<string> {
    return bcrypt.hash(passwordPlain, 10);
}
