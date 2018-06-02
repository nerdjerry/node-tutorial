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

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 400;
    res.end('This operation is not allowed');
})
.post(authenticate.verifyUser,upload.single('file'),(req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 400;
    res.end('This operation is not allowed');
})
.delete(authenticate.verifyUser,(req,res,next) => {
    res.statusCode = 400;
    res.end('This operation is not allowed');
});

module.exports = uploadRouter;