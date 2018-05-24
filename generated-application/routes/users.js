var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');
var bodyParser = require('body-parser');
var session = require('express-session');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  if (req.body.username) {
    User.findOne({
        username: req.body.username
      })
      .then((user) => {
        if (user != null) {
          err = new Error('User with username: ' + req.body.username + ' already exists');
          err.status = 403;
          next(err);
        } else {
          return User.create({
            username: req.body.username,
            password: req.body.password
          });
        }
      })
      .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          message: "Registration succesfull"
        });
      }, (err) => next(err))
      .catch((err) => next(err));
  } else {
    err = new Error('No username, password provided to signup');
    err.status = 400;
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  if(!req.session.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      res.setHeader('Www-Authenticate', "Basic")
      var err = new Error('You are not authenticated user');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(" ")[1], 'base64').toString().split(":");
    var username = auth[0];
    var password = auth[1];
    User.findOne({username: username})
    .then((user) => {
      if(!user){
        err = new Error("Username is not registered");
        err.status = 400;
        next(err);
      }else if(user.password != password){
        err = new Error("Password is incorrect");
        err.status = 400;
        next(err);
      }else if(user.username == username && user.password == password){
        req.session.user = "authenticated";
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message : "You are now logged in"});
      }
    },(err) => next(err))
    .catch((err) => next(err));
  }else{
    if(req.session.user === "authenticated"){
      res.statusCode = 200;
      res.setHeader('Content-Type','text/plain');
      res.end("You are already logged in");
    }else{
      var err = new Error('You are not authenticated user');
      err.status = 401;
      next(err);
    }
  }
});

router.get('/logout', (req, res, next) => {
  if(req.session.user === "authenticated"){
    console.log('Deleting session');
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error("You are not logged in");
    err.status = 400;
    next(err);
  }
});
module.exports = router;