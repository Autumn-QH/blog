var models = require('../models');
var User = models.User;
var utility = require('utility');

/**
 * 根据登录名查找用户
 * @param  {String} name 登录名
 * @param  {Function} cb 回调函数
 */
exports.getUserByname = function (name, cb) {
  if(name.length === 0){
    return cb(null,[]);
  }
  User.findOne({name: name}).exec(cb);
};

/**
 * 注册
 * @param  {String} name 登录名
 * @param  {String} password 密码
 * @param  {email} email 邮箱
 * @param  {Function} cb 回调函数
 */
exports.setUser = function (name, password, email, cb) {
  var user = new User();
  user.name = name;
  user.password = password;
  user.email = email;
  user.save(cb);
}