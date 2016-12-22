var models = require('../models');
var Post = models.Post;
var markdown = require('markdown').markdown;

exports.get = function (cb) {
  Post.find({}).sort('-create_at').exec(function(err, data) {
    if(err){
      return cb(err);
    }
    
    data.forEach(function (doc) {
      doc.text = markdown.toHTML(doc.text);
    });
    return cb(null, data);
  });
};

exports.set = function (name,title, text, cb) {
  var post = new Post();
  post.name = name;
  post.title = title;
  post.text = text;
  post.create_at = new Date().getTime();
  post.update_at = new Date().getTime();
  post.save(cb);
};

exports.getOne = function (name, time, title, cb) {
  Post.findOne({name: name, create_at: time, title: title}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    data.text = markdown.toHTML(data.text);
    return cb(null, data);
  });
};

exports.getUser =function (name, cb) {
  Post.find({name: name}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    
    data.forEach(function (doc) {
      doc.text = markdown.toHTML(doc.text);
    });
    return cb(null, data);
  });
};

exports.getEdit = function (name, time, title, cb) {
  Post.findOne({name: name, create_at: time, title: title}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    return cb(null, data);
  });
};

exports.setEdit = function (name,title, time, text, cb) {
  var now = new Date().getTime()+'';
  Post.update(
    {name: name, create_at: time, title: title}, 
    {$set: {text: text, update_at: now}}).exec(cb);
};

exports.remove = function (name, title, time, cb) {
  Post.remove({name: name, title: title, create_at: time}).exec(cb);
};