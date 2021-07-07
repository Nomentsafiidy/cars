import { ApiLoginUserResponse } from './../models/ApiResponse';
import * as functions from './../functions';
import * as daoUser from './../dao/user';
import * as jwt from 'jsonwebtoken';

export class LoginService {
    /**
     * Login for an User
     * @param login: (string)
     * @param password: (string)
     * @return (Promise<hiboulib.ApiLoginUserResponse>)
     */
    public loginUser = async (login: string, password: string): Promise<ApiLoginUserResponse> => {
        const connection = functions.getConnection();
        const response: ApiLoginUserResponse = { success: false };
        const sql = 'SELECT * FROM user WHERE ;';
        const values = [login];

        const res = await daoUser.selectUser(connection, 'email = ?', values);
        if (res) {
            if (res.length === 1) {
                const user = res[0];
                // Check password
                if (await functions.checkPassword(password, user.password)) {
                    delete user.password;
                    const token = jwt.sign({ uid: user.id, exp: Math.round(new Date().getTime() / 1000 + 3600) }, process.env.JWT_KEY);
                    response.success = true;
                    response.user = user;
                    response.token = token;
                } else {
                    response.message = 'Wrong Password';
                }
            } else {
                response.message = 'Error on login';
            }
        } else {
            response.message = 'User not found';
        }
        return response;
    };
}

export const loginService = new LoginService();
