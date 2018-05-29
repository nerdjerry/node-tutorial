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
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', "application/json");
        res.json({
          err: err
        });
      } else {
        if (req.body.firstname)
          account.firstname = req.body.firstname
        if (req.body.lastname)
          account.lastname = req.body.lastname
        account.save()
          .then((account) => {
            passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({
                status: true,
                status: 'Registration Successfull'
              });
            });
          }, (err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', "application/json");
            res.json({
              err: err
            });
          })
      }
    })
  } else {
    err = new Error('No username, password provided to signup');
    err.status = 400;
    next(err);
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
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