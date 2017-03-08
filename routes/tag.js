var express = require('express');
var router = express.Router();
var porxy = require('../porxy');
var Post = porxy.Post;

router.get('/', function(req, res, next) {
	Post.getTags(function(err, data) {
		if(err){
			res.render('error', {
        message: '数据库异常',
        error: err
      });
		}

		res.render('tags', {
			title: '标签',
			posts: data
		})
	});
});

router.get('/:tag', function(req, res, next) {
	var tag = req.params.tag;

	Post.getTag(tag, function(err, data) {
		if(err){
			res.render('error', {
				message: '数据库异常',
				error: err
			});
		}

		res.render('tag' ,{
			title: '标签: ' + tag,
			posts: data
		});
	});
});

module.exports = router;