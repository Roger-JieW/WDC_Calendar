var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/register', function(req, res) {  //接收register的name和password
  console.log(req.body);                    //输出测试接收到的数据
})
app.post('/login', function(req, res) {     //接收login的name和password
  const hisname = "Yum";                    //测试用户名 需修改为与数据库比对
  const hispassword = "123";                //测试密码 需修改为与数据库比对
  const user = {
    name: hisname,
    password: hispassword,
  }
  if (req.body.name === hisname && req.body.password === hispassword) {  //判断用户名和密码是否正确
    var token = jwt.sign({user}, 'robot', {expiresIn: '1h'});            //生成token
    res.status(200).send(token);                                         //返回token
    console.log(user, token);                                            //测试输出返回给前端的token
  } else {                                                               //比对错误返回错误信息
    res.status(403).send("Login Failed");
  }
})
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
