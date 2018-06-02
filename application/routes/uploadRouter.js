const express = require('express');
const uploadRouter = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const authenticate = require('../authenticate');