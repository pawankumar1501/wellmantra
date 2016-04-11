var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var passport = require('passport');
var session = require('express-session'); 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var multer = require('multer');



require('./models/models');

var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var admin = require('./routes/admin');
// var users = require('./routes/users');

var mongoose = require('mongoose');
// connect to mongo db
mongoose.connect("mongodb://localhost/book-lib");
// -mongoose.connect("mongodb://MongoLab-u:LU88nFbArVy3t.mNzjWKUFKSswAd6CnPGIbjnEM93Fo-@ds064278.mlab.com:64278/MongoLab-u");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({dest:'E:/MEAN'}).single('eventPic'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret:'super secret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/api', api);
app.use('/auth',authenticate);
app.use('/admin',admin);

// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
