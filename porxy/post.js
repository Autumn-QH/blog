var models = require('../models');
var Post = models.Post;
var markdown = require('markdown').markdown;

exports.get = function (page, cb) {
  Post.count({}).exec(function(err, count) {
    if(err){
      return cb(err);
    }else{
      Post.find({},{text:0}).limit(10).skip((page-1)*10).sort('-create_at').exec(function(err, data) {
        return cb(null, data, count);
      });
    }
  });
};

exports.set = function (name,title, text, tags, cb) {
  var post = new Post();
  post.name = name;
  post.title = title;
  post.text = text;
  post.tags = tags;
  post.create_at = new Date();
  post.update_at = new Date();
  post.save(cb);
};

exports.getOneByTitle = function (title,cb) {
  Post.findOne({title: title}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    cb(null,data);
  });
};

exports.getOne = function (id, cb) {
  Post.findOne({_id: id}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    if(data){
      //data.text = markdown.toHTML(data.text);
      return cb(null,data);
    }
    return cb(null, null);
  });
};

exports.getUser =function (name, cb) {
  Post.find({name: name}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    
    // data.forEach(function (doc) {
    //   doc.text = markdown.toHTML(doc.text);
    // });
    return cb(null, data);
  });
};

exports.getEdit = function (id, cb) {
  Post.findOne({_id: id}).exec(function(err, data) {
    if(err){
      return cb(err);
    }
    return cb(null, data);
  });
};

exports.setEdit = function (id, text, cb) {
  var now = new Date().getTime()+'';
  Post.update({_id: id}, 
    {$set: {text: text, update_at: now}}).exec(cb);
};

exports.remove = function (id, cb) {
  Post.remove({_id: id}).exec(cb);
};

exports.getTags = function (cb) {
  Post.distinct('tags',{}).exec(cb);
};

exports.getTag = function (tag, cb) {
  Post.find({tags: tag},{_id: 1, title: 1, create_at: 1}).exec(cb);
};

exports.search = function(keywork, cb) {
  var keywork = new RegExp(keywork, 'i');
  Post.find({title: keywork},{text:0}).sort('-create_at').exec(cb);
};