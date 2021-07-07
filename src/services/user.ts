import { ApiResponse } from './../models/ApiResponse';
import * as functions from './../functions';
import * as dasUser from './../dao/user';
import { User } from 'src/models/User';

export class UserService {
    /**
     * addUser
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    addUser = async (user: User): Promise<ApiResponse> => {
        const connection = functions.getConnection();
        const response: ApiResponse = { success: false };
        if (user.name && user.email && user.password) {
            user.password = await functions.hashPassword(user.password);
            const [success, error, res] = await dasUser.insertUser(connection, user);
            if (res && res.affectedRows === 1 && res.insertId) {
                response.success = true;
            }
        } else {
            throw new Error('Invalide params');
        }
        return response;
    };
}

export const userService = new UserService();
