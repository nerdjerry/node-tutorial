const expres = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const dishRouter = expres.Router();
const cors = require('./cors');

dishRouter.use(bodyParser.json());

//TODO : Add populate when you get dishes and comments
//TODO : Add user id to comment when adding comment
dishRouter.route('/')
    .options(cors.corsWithOptions)
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(cors.cors,(req, res, next) => {
        res.end('Sending you details of all the dishes');
    })
    .post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.write("You add dish with name " + req.body.name + " and description " +
            req.body.description);
        res.end('Sending you updated dishes')
    })
    .put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 400;
        res.end('This operation is not allowed');
    })
    .delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting all the dishes!!!');
    });

dishRouter.route('/:dishId')
    .options(cors.corsWithOptions)
    .get((req, res, next) => {
        res.end("Sending you dish with id " + req.params.dishId);
    })
    .post(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 400;
        res.end('The opration is not supported');
    })
    .put(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.end('You have updated details of dish with id ' + req.params.dishId +
            ' with new name ' + req.body.name + ' and description ' + req.body.description);
    })
    .delete(cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
        res.end('You are deleting dish with id ' + req.params.dishId);
    });

module.exports = dishRouter;