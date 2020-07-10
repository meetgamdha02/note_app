var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var userRouter = require('./routes/userRouter');
var mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var app = express();
// mongodb://localhost:27017/todo

const URL = 'mongodb+srv://meet:@M1e2e3t4@cluster0.xnrh5.mongodb.net/todo?retryWrites=true&w=majority';
const connect = mongoose.connect(URL || process.env.MONGODB_URI ,{
  useUnifiedTopology : true,
  useNewUrlParser : true
});

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
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../frontend/build'));
}
app.use('/', userRouter);
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
