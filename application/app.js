var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var passport = require('passport');
var authenticate = require('./authenticate');
var config  = require('./config');

var app = express();

const url = config.mongourl;

mongoose.connect(url).then(() => {
  console.log("Connection to database successfull");
}, (err) => {
  console.log(err);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//app.use(cookieParser('12345-7839-81292'));
//Remove session support
/*app.use(session({
  name: 'session-id',
  secret: '12345-32131-12121',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));*/

app.use(passport.initialize());
app.use(passport.session());

//Route all requests to HTTPS Server 
app.use("*", (req,res,next) =>{
  if(req.secure){
    next()
  }else{
    res.redirect(307,"https://" + req.hostname + ":" + app.get('secPort') +req.url);
  }
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;