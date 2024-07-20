const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { specs, swaggerUI } = require('./configs/swagger.config');

const app = express();

const Router = require('./routes/index.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static('/public'));
app.use(morgan('dev'));

app.use('/api', Router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;