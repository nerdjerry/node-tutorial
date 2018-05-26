var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userSchema');
var bodyParser = require('body-parser');
var passport = require('passport');

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

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      status: true,
      status: 'Login Successfull'
    });
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
module.exports = router;