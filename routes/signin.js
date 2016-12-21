var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/check').checkNotLogin;
var User = require('../porxy').User;

//登录页
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signin', {
    title: '登录'
  });
});

//用户登录
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.body['name'];
  var password = req.body['password'];
  User.getUserByname(name, function(err, user) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }
    
    if(!user){
      req.flash('error', '用户不存在');
      return res.redirect('/signin');
    }
    
    if(user.password != password){
      req.flash('error', '密码错误');
      return res.redirect('/signin');
    }

    req.session.user = user;
    req.flash('success', 'welcome go home: ' + user.name);
    res.redirect('/');
  });
});

module.exports = router;