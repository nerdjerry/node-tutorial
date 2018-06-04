var User = require('./models/userSchema');
var LocalStratergy = require('passport-local').Strategy;
var passport = require('passport');
var config = require('./config');
var JwtStratergy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var facebookStrategy = require('passport-facebook-token');

exports.local = passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var opts = {};
opts.secretOrKey = config.secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

exports.jwt = passport.use(new JwtStratergy(opts, (jwt_payload, done) => {
    User.findOne({
            _id: jwt_payload._id
        })
        .then((user) => {
            done(null, user);
        }, (err) => {
            done(err, false);
        }).catch((err) => {
            done(null, false);
        })
}));

exports.getToken = (user) => {
    return jwt.sign(user, config.secret, {
        expiresIn: 36000
    });
}

exports.verifyUser = passport.authenticate('jwt', {
    session: false
});

exports.facebookLogin = passport.use(new facebookStrategy({
    clientID : config.clientId,
    clientSecret : config.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId : profile.id})
    .then((user) => {
        if(user){
            done(null, user);
        }else{
            user = new User({facebookId : profile.id});
            user.username = profile.displayName;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName
            user.save()
            .then((user) => {
                done(null, user);
            })
        }
    }, (err) => {
        done(err, null);
    })
}));