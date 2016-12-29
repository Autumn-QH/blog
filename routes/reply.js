var express = require('express');
var router = express.Router();
var Reply = require('../porxy').Reply;

router.post('/create', function(req, res, next) {
  var content = req.body['content'];
  var post_id = req.body['post_id'];
  var user_name = req.session.user.name;

  Reply.set(content, post_id, user_name, function(err) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }

     req.flash('success', '回复成功');
     res.redirect('back');
  });
});

module.exports = router;