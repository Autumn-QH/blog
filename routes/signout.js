var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

//登出
router.get('/', checkLogin, function(req, res, next) {
  req.session.user = null;
  req.flash('success','退出成功');
  res.redirect('/');
});

module.exports = router;