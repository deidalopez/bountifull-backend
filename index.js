require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router');
const app = express();

const PORT = process.env.PORT || 3001;

const corsConfig = {
    origin: 'http://localhost:19006',
    credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
