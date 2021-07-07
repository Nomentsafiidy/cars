import * as mysql from 'mysql';
import { User } from './../models/User';
import * as dao from './dao';

/**
 * DAO for the table USER
 */
/**
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @param values: (any[])(default: null)
 * @return (???)
 */
export function selectUser(connection: mysql.Connection, whereCondition: string, values: any[] = null) {
    const query = 'SELECT * FROM `user`';
    return dao.select<User>('selectUser', connection, query, whereCondition, values);
}

/**
 * @param connection: (mysql.Connection)
 * @param user: (User)
 * @param password: (string)(optional)
 */
export function insertUser(connection: mysql.Connection, user: User, password?: string) {
    const columns = [`email`, `name`, `password`];
    const prepare = columns
        .map(() => {
            return '?';
        })
        .join(',');
    const query = 'INSERT INTO `user` (' + columns.join(',') + ') VALUES (' + prepare + ')';
    const values = [user.email, user.name, user.password];
    // Logger.db('[user.ts] query:', query);
    return dao.insert('insertUser', connection, query, values);
}
