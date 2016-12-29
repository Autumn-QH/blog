var mongoose = require('mongoose');
var config = require('config-lite');

mongoose.connect(config.db, 
  {server: {poolSize: 5}}, 
  function(err) {
    if(err){
      console.log(err);
    }
  });

require('./user');
require('./post');
require('./reply');

exports.User = mongoose.model('User');
exports.Post = mongoose.model('Post');
exports.Reply = mongoose.model('Reply');