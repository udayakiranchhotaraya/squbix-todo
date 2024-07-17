const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const dbConnect = require('./db/db.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('/public'));
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
const SERVER_URL = `http://localhost:${PORT}`;

(async function () {
    try {
        await dbConnect();
        app.listen(PORT, () => console.log(`Server started at ${SERVER_URL}`));
    } catch (error) {
        console.error(`Connection error: ${error}`);
        process.exit(1);
    }
})();