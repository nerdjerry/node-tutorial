const htpp = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});
app.get('/dishes',(req,res,next) => {
    res.end('Sending you details of all the dishes');
});
app.post('/dishes', (req,res,next) => {
    res.write("You add dish with name " + req.body.name + " and description " + 
                req.body.description);
    res.end('Sending you updated dishes')
});
app.put('/dishes', (req,res,next) => {
    res.statusCode = 400;
    res.end('This operation is not allowed');
});
app.delete('/dishes', (req,res,next) => {
    res.end('Deleting all the dishes!!!');
});

//Dealing with param provided requests

app.get('/dishes/:dishId', (req,res,next) => {
    res.end("Sending you dish with id " + req.params.dishId);
});
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 400;
    res.end('The opration is not supported');
});
app.put('/dishes/:dishId', (req,res,next) => {
    res.end('You have updated details of dish with id ' + req.params.dishId
            + ' with new name ' + req.body.name + ' and description ' + req.body.description);
});
app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('You are deleting dish with id ' + req.params.dishId);
})
app.listen(3000);
