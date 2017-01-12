var express = require('express');
var router = express.Router();
var Post = require('../porxy').Post;

//特定用户的文章页
router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  Post.getUser(name, function(err, data) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }

    res.render('user', {
      title: name,
      posts: data
    })
  });
});

module.exports = router;