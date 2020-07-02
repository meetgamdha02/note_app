var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var signUpRouter = require('./routes/SignUp');
var logInRouter = require('./routes/logIn');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();


const URL = 'mongodb://localhost:27017/todo';
const connect = mongoose.connect(process.env.MONGODB_URL || URL);

connect.then((db) => {
  console.log('Connected Successfully');
})
  .catch((err) => {
    console.log(err);
  })
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// function auth(req, res, next) {
//   console.log(req.session);

//   if (!req.session.username) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     return next(err);
//   }
//   else {
//     if (req.session.user === 'authenticated') {
//       next();
//     }
//     else {
//       var err = new Error('You are not authenticated!');
//       err.status = 403;
//       return next(err);
//     }
//   }
// }
// app.use(auth)
app.use('/', indexRouter);
app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../frontend/build'));
}
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
