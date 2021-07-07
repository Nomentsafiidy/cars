// dao.ts
import * as mysql from 'mysql';

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param prefix_query: (string)
 * @param whereCondition: (string)(default: null)
 * @param values: (any[])(default: null)
 * @return (Promise<false | T[]>)
 */
export function select<T>(
    method_name: string,
    connection: mysql.Connection,
    prefix_query: string,
    whereCondition: string = null,
    values: any[] = null
): Promise<false | T[]> {
    let response: any = false;

    let query = prefix_query;

    if (whereCondition && whereCondition !== '') {
        query += ' WHERE ' + whereCondition;
    }

    // Logger.db('[dao/dao - select - ' + method_name + '] query:', query);
    return new Promise((resolve, reject) => {
        connection.query(query + ';', values, (err: Error, res: any) => {
            if (err) {
                response = false;
                // TODO MESSAGE D'erreur
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
}

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<[boolean, mysql.MysqlError, any]>)
 */
export function insert(method_name: string, connection: mysql.Connection, query: string, values: any[]): Promise<[boolean, mysql.MysqlError, any]> {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    resolve([response, err, res]);
                });
            } else {
                if (res) {
                    response = true;
                } else {
                    response = false;
                }
            }
            resolve([response, err, res]);
        });
    });
}

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param table_name: (string)
 * @param columns: (string[])
 * @param values: (any[]) 2-d array(1: row, 2: columns values)
 * @return (Promise<false> | Promise<any>)
 */
export function insertMultiple(
    method_name: string,
    connection: mysql.Connection,
    table_name: string,
    columns: string[],
    values: any[]
): Promise<false> | Promise<any> {
    let query = 'INSERT INTO `' + table_name + '`';
    query += '(' + columns.join(',') + ')';
    query += ' VALUES' + values.map((row) => '(' + row.map((value: any) => '?').join(',') + ')').join(',');
    const all_values: any[] = values.reduce((acc, val) => acc.concat(val), []); // flatten values
    return insert(method_name, connection, query, all_values);
}

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<false> | Promise<any>)
 */
export function update(method_name: string, connection: mysql.Connection, query: string, values: any[]): Promise<false> | Promise<any> {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    // TODO MESSAGE D'erreur
                    resolve(response);
                });
                return;
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
}

/**
 * @param method_name: (string)
 * @param connection: (mysql.Connection)
 * @param query: (string)
 * @param values: (any[])
 * @return (Promise<false> | Promise<any>)
 */
export function deleteSQL(method_name: string, connection: mysql.Connection, query: string, values: any[]): Promise<false> | Promise<any> {
    let response = false;
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, res) => {
            if (err) {
                connection.rollback(() => {
                    response = false;
                    // TODO MESSAGE D'erreur
                    resolve(response);
                });
                return;
            } else {
                if (res) {
                    response = res;
                } else {
                    response = false;
                }
            }
            resolve(response);
        });
    });
}
