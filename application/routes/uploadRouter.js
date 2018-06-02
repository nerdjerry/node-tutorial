const express = require('express');
const uploadRouter = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const authenticate = require('../authenticate');

const options = {}

options.storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'public/images');
    },
    filename: (req,file,cb) =>{
        cb(null, file.originalname);
    }
});

options.fileFilter = (req,file,cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        cb(new Error("File format not supported"));
    }
    cb(null, true);
}

var upload = multer(options)