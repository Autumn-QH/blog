var express = require('express');
var router = express.Router();
var Post = require('../porxy').Post;

router.get('/', function(req, res, next) {
  var keyword = req.query.keyword;

  Post.search(keyword, function(err, data) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }

    res.render('search', {
      title: keyword,
      posts: data
    });
  });
});

module.exports = router;