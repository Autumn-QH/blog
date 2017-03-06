var Reply = require('../models').Reply;
var markdown = require('markdown').markdown;

exports.getReplyByPostId = function (id, cb) {
  Reply.find({post_id: id, deleted: false}).sort('create_at').exec(function(err, data) {
    if(err){
      return cb(err);
    }

    data.forEach(function(doc) {
      doc.content = markdown.toHTML(doc.content);
    });

    return cb(null,data);
  });
};

exports.set = function (content, post_id, user_name, cb) {
  var reply = new Reply();
  reply.content = content;
  reply.post_id = post_id;
  reply.user_name = user_name;
  reply.create_at = new Date();
  reply.update_at = new Date();
  reply.save(cb);
};