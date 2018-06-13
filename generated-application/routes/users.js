var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  if (req.body.username) {
    User.register(new User({
      username: req.body.username
    }), req.body.password, function (err, account) {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          status: true,
          status: 'Registration Successfull'
        });
      });
    })
  } else {
    err = new Error('No username, password provided to signup');
    err.status = 400;
    next(err);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: false,
        message: 'Login Unsuccessfull',
        err: info
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      var token = authenticate.getToken({
        _id: req.user._id
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: true,
        token: token,
        message: 'Login Successfull'
      });
    })
  })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error("You are not logged in");
    err.status = 400;
    next(err);
  }
});

router.get('/checkJWT', (req,res,next) => {
  passport.authenticate('jwt', {session : false}, (err, user, info) => {
    if(err) {
      return next(err);
    }
    if(!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: false,
        message: 'Token Invalid',
        err: info
      });
    }
    res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        status: true,
        message: 'Token Valid'
      });
  }) (req,res,next);
})
module.exports = router;