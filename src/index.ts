require('dotenv').config();

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`'The application is listening on port ${process.env.PORT || 4000}`);
});
