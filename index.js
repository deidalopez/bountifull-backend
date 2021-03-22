require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3001;

const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(SERVER_PORT, () => console.log(`Server is running on http://localhost:${SERVER_PORT}`));
