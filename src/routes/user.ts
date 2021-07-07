import * as express from 'express';
import { ApiResponse } from './../models/ApiResponse';
import { userService } from './../services/user';
const router = express.Router();

/**
 * @param req.body.user : (user)
 * @body provider: (string) JSON of a provider object
 */
router.post('/addUser', async (req, res) => {
    let response: ApiResponse = { success: false };
    try {
        if (req.body && req.body.user) {
            response = await userService.addUser(req.body.user);
        }
    } catch (err) {
        response.message = err;
    }

    return res.send(response);
});
