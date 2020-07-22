const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();

const routes = require('../routes/routes');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/node/api', routes);

module.exports = app;
