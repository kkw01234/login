var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser'); /*json 구조*/ 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
const sessionRepository = require('./repository/sessionRepository.js');
const {query} = require("./db/database.js");
const {validateCookie} = require("./utils/utils.js");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 들어올때마다 Session Check
app.use(async function(req,res,next){ 
    setImmediate(()=>{
      sessionRepository.deleteTimeoutSession();
    });
    const cookie = await sessionRepository.selectSession(req.cookies.sessionid || 0);
    setImmediate(()=>{
      sessionRepository.updateSession(cookie[0]);
    });
    req.validatyCookie = validateCookie(cookie);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/loginpage', loginRouter);
app.use('/registerpage', registerRouter);



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
