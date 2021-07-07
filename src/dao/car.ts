import * as mysql from 'mysql';
import { Car } from 'src/models/Car';
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
export function insertCar(connection: mysql.Connection, car: Car) {
    const query = 'INSERT INTO `car` (`user_id`, `name`, `registration`) VALUES (?, ?, ?)';
    const values = [car.user_id, car.name, car.registration];
    return dao.insert('insertCar', connection, query, values);
}

/**
 * Get all the activities
 * @param connection: (mysql.Connection)
 * @param whereCondition: (string)
 * @return (???)
 */
export function selectCar(connection: mysql.Connection, whereCondition: string) {
    const query = 'SELECT * FROM `car`';
    return dao.select<Car>('selectCar', connection, query, whereCondition);
}
