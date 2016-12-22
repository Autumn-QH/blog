var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var User = require('../porxy').User;

//注册页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup', {
    title: '注册'
  });
});

//用户注册
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.body['name'];
  var password = req.body['password'];
  var password_re = req.body['password-repeat'];
  var email = req.body['email'];

  if(password != password_re){
    req.flash('error', '两次密码输入不一致!');
    return res.redirect('/signup');
  }

  User.getUserByname(name, function(err, user){
    if(user){
      req.flash('error', '用户名已存在');
      return res.redirect('/signup');
    }

    User.setUser(name, password, email, function(err, user){
      if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
      }

      req.session.user = user;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
});

module.exports = router;