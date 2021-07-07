import * as express from 'express';
import { loginService } from './../services/login';
const router = express.Router();

router.post('/loginUser', async (req, res) => {
    let response = { success: false };
    if (req.body && req.body.login && req.body.password) {
        const login = req.body.login;
        const password = req.body.password;
        response = await loginService.loginUser(login, password);
    }

    return res.send(response);
});

export { router };
