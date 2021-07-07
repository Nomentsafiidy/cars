import * as mysql from 'mysql';
import { Comment } from 'src/models/Comment';
import * as dao from './dao';

/**
 * DAO for the table Car
 */
/**
 * Insert the activity
 * @param connection: (mysql.Connection)
 * @param activity: (hiboulib.Activity)
 * @return (???)
 */
export function insertComment(connection: mysql.Connection, comment: Comment) {
    const query = 'INSERT INTO `comment` (`user_id`, `car_id`, `content`, `createdAt`) VALUES (?, ?, ?, ?)';
    const values = [comment.user_id, comment.car_id, comment.content, new Date().getTime()];
    return dao.insert('insertComment', connection, query, values);
}

/**
 * Get all the activities
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @return (???)
 */
export function selectComment(connection: mysql.Connection, whereCondition: string) {
    const query = 'SELECT * FROM `comment`';
    return dao.select<Comment>('selectComment', connection, query, whereCondition);
}
