const htpp = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./router/dishRouter');

const app = express();
app.use(morgan('dev'));
app.use('/dishes',dishRouter);

app.listen(3000);