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
const {validateCookie,setCookieTime} = require("./utils/utils.js");
const fs = require('fs');
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
    try{
      const cookie = await sessionRepository.selectSession(req.cookies.sessionid || 0);
      sessionRepository.updateSession(cookie[0]);
  
      if(cookie.length > 0){
        res.cookie('sessionid', cookie[0].session_id,{
          maxAge : setCookieTime()
        });
        if(validateCookie(cookie))
            req.validatyCookie = {
              user_id : cookie[0].user_id,
              user_name : cookie[0].user_name
            };
      }else
          req.validatyCookie = {user_id : "", user_name :""};
      console.log(req.validatyCookie);
      next();
    }catch(e){
      next(e);
    }
    
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
  const logs = JSON.parse(fs.readFileSync("./error/errorlog.json",{encoding : "utf-8"}));
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  const date = new Date();
  const newLog = {
    ip : req.headers['x-forwared-for'] || req.connection.remoteAddress,
    message : err.message,
    error : err.stack,
    date : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
  
  logs.push(newLog);
  fs.writeFileSync("./error/errorlog.json",JSON.stringify(logs));
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
