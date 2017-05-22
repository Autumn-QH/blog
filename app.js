var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer'); 
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var winston = require('winston');
var expressWinston = require('express-winston');
var ueditor = require('ueditor');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

//设置静态文件目录
app.use(express.static('public'));

//解析中间件 req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
//app.use(multer());

//session 中间件
app.use(session({
  name: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge,
  },
  store: new MongoStore({
    url: config.db
  }),
  resave: false,
  saveUninitialized: false
}));

//flash 中间价，用来显示通知
app.use(flash());

//设置模板全局常量
//app.locals
//添加模板必需的三个变量
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

//正常请求的日志
app.use(expressWinston.logger({
  transports: [
    // new winston.transports.Console({
    //   json: true,
    //   colorize: true
    // }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })]
}));

//路由
routes(app);

//ueditor 上传路由。
//为什么把这个路由放到 routes(app)里面就用不了呢。求大神issues
//为什么ueditor 里面不可以使用markdown语法...
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
  //客户端上传文件设置
  var imgDir = '/img/ueditor/'
  var ActionType = req.query.action;
  if(ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo'){
    var file_url = imgDir;//默认图片上传地址
    /*其他上传格式的地址*/
    if (ActionType === 'uploadfile') {
      file_url = '/file/ueditor/'; //附件
    }
    if (ActionType === 'uploadvideo') {
      file_url = '/video/ueditor/'; //视频
    }
    res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if(req.query.action === 'listimage') {
    var dir_url = imgDir;
    res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else{
    // console.log('config.json')
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/ueditor/nodejs/config.json');
  }
}));

//错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    // new winston.transports.Console({
    //   json: true,
    //   colorize: true
    // }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })]
}));

//错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

if(module.parent){
  module.exports = app;
}else{
  app.listen(config.port, function() {
    console.log(`${pkg.name} listening on port ${config.port}`);
  });
}