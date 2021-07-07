require('dotenv').config();

import express from 'express';

import * as car from './routes/car';
import * as login from './routes/login';

const app = express();

app.use(express.json());

app.use(car.router);
app.use(login.router);

app.get('/', (req, res) => {
    res.send('Well done!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`'The application is listening on port ${process.env.PORT || 4000}`);
});
