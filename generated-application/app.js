var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session  = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-7839-81292'));
app.use(session({
  name: 'session-id',
  secret: '12345-32131-12121',
  saveUninitialized : false,
  resave : false,
  store : new FileStore()
}));

function auth(req,res, next){
  console.log(req.session);
  if(!req.session.user){
    var authHeader = req.headers.authorization;
    if(!authHeader) {
      res.setHeader('Www-Authenticate', "Basic")
      var err = new Error('You are not authenticated user');
      err.status = 401;
      next(err);
      return;
    }
  
    var auth = new Buffer.alloc(authHeader.split(" ")[1].length,authHeader.split(" ")[1], 'base64').toString().split(":");;
    var username = auth[0];
    var password = auth[1];
    if(username == "admin", password = "password"){
      req.session.user = "admin";
      next();
    }else{
      res.setHeader('Wwww-Authenticate', "Basic")
      var err = new Error('You are not authenticated user');
      err.status = 401;
      next(err);
    }
  }else{
    if(req.session.user === "admin"){
      next()
    }else{
      var err = new Error('You are not authenticated user');
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
