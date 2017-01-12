var express = require('express');
var router = express.Router();
var Post = require('../porxy').Post;

module.exports = function (app) {
  app.get('/', function(req, res, next) {
    Post.get(function(err, data) {
      if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
      }

      res.render('index', {
        title: '主页',
        posts: data
      })
    });
});
  app.use('/signin', require('./signin'));//登录
  app.use('/signup', require('./signup'));//注册
  app.use('/signout', require('./signout'));//登出
  app.use('/posts', require('./posts'));//文章
  app.use('/reply', require('./reply'));//回复
  app.use('/user', require('./user'));;//用户
};