const expres = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const dishRouter = expres.Router();

dishRouter.use(bodyParser.json());

//TODO : Add populate when you get dishes and comments
//TODO : Add user id to comment when adding comment
dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Sending you details of all the dishes');
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.write("You add dish with name " + req.body.name + " and description " +
            req.body.description);
        res.end('Sending you updated dishes')
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 400;
        res.end('This operation is not allowed');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting all the dishes!!!');
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        res.end("Sending you dish with id " + req.params.dishId);
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 400;
        res.end('The opration is not supported');
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.end('You have updated details of dish with id ' + req.params.dishId +
            ' with new name ' + req.body.name + ' and description ' + req.body.description);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('You are deleting dish with id ' + req.params.dishId);
    });

module.exports = dishRouter;