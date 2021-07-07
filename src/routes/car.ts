// user.ts
import * as express from 'express';
import { auth } from './../middleware/authorization';
import { ApiCarsResponse, ApiResponse } from './../models/ApiResponse';
const router = express.Router();

router.get('/getCars', auth(), async (req: any, res) => {
    let response: ApiCarsResponse = { success: false, cars: [] };
    try {
        if (req.user) {
            console.log('user', req.user);
            console.log('**if**');
        } else {
            console.log('**else**');
        }
    } catch (error) {
        response.message = '' + error;
    }
    return res.send(response);
});

export { router };
