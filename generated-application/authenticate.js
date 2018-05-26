var User = require('./models/userSchema');
var LocalStratergy = require('passport-local').Strategy;
var passport = require('passport');

exports.local = passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());