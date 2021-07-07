import { ApiResponse } from './../models/ApiResponse';
import * as functions from './../functions';
import * as dasComment from './../dao/comment';
import { Comment } from './../models/Comment';

export class CommentService {
    /**
     * addUser
     * @param auth: (boolean) when user is authenticate
     * @return (Promise<ApiCarsResponse>)
     */
    addComment = async (comment: Comment): Promise<ApiResponse> => {
        const connection = functions.getConnection();
        const response: ApiResponse = { success: false };
        if (comment.user_id && comment.car_id && comment.content) {
            const [success, error, res] = await dasComment.insertComment(connection, comment);
            if (res && res.affectedRows === 1 && res.insertId) {
                response.success = true;
            }
        } else {
            throw new Error('Invalide params');
        }
        return response;
    };
}

export const commentService = new CommentService();
