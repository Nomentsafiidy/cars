// user.ts
import * as express from 'express';
import { auth } from './../middleware/authorization';
import { ApiCarsResponse } from './../models/ApiResponse';
import { carService } from './../services/car';
const router = express.Router();

router.get('/getCars', auth(), async (req: any, res) => {
    let response: ApiCarsResponse = { success: false, cars: [] };
    try {
        if (req.user) {
            response = await carService.getCars(true);
        } else {
            response = await carService.getCars(false);
        }
    } catch (error) {
        response.message = '' + error;
    }
    return res.send(response);
});

export { router };
