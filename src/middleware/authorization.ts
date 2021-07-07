// Import Libraries
import * as jwt from 'jsonwebtoken';
// Import Own
import * as functions from './../functions';
import * as daoUser from './../dao/user';
import { User } from './../models/User';

// Autorization middleware

/**
 * Return express middleware function
 *
 * @param audience
 */
export function auth() {
    return async (req: any, res: any, next: () => void) => {
        console.log('getCars');
        if (req.user) {
            delete req.user;
        }
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const connection = functions.getConnection();
            const token = req.headers.authorization.split(' ')[1];
            try {
                const data: any = jwt.verify(token, process.env.JWT_KEY);
                if (!isNaN(data.uid)) {
                    const userId = data.uid;
                    const users = await daoUser.selectUser(connection, 'id = ?', userId);
                    req.user = new User(users[0]);
                }
            } catch (error) {
                const code = error.httpCode || 401;
                res.status(code).end();
            }
        }
        next();
    };
}
