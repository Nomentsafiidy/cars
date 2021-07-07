import * as express from 'express';
import { auth } from './../middleware/authorization';
import { ApiResponse } from './../models/ApiResponse';
import { commentService } from './../services/comment';
const router = express.Router();

/**
 * @param req.body.comment : (Comment)
 * @body provider: (string) JSON of a provider object
 */
router.post('/addComment', auth(), async (req: any, res) => {
    let response: ApiResponse = { success: false };
    try {
        if (req.user) {
            if (req.body && req.body.comment) {
                response = await commentService.addComment(req.body.comment);
            } else {
                throw new Error('Params Invalid');
            }
        } else {
            throw new Error('Permission Required');
        }
    } catch (err) {
        response.message = err;
    }

    return res.send(response);
});
