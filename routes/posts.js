var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var Post = require('../porxy').Post;

//发表文章页
router.get('/create', checkLogin, function(req, res, next) {
  res.render('post', {
    title: '发表'
  });
});

//发表一篇文章
router.post('/create', checkLogin, function(req, res, next) {
  var title = req.body['title'];
  var text = req.body['text'];
  var name = req.session.user.name;
  Post.set(name,title, text, function(err, post) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }
    
    req.flash('success', '发表成功');
    res.redirect('/');
  });
});

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

//单独一篇的文章页
router.get('/:name/:title/:time', function(req, res, next) {
  var name = req.params.name;
  var time = req.params.time;
  var title = req.params.title;

  Post.getOne(name, time, title, function(err, data) {
    if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
      }

    res.render('article',{
      title: title,
      post: data
    });     
  });
});

//更新文章页
router.get('/edit/:name/:title/:time', checkLogin, function(req, res, next) {
  var name = req.params.name;
  var time = req.params.time;
  var title = req.params.title;

  Post.getEdit(name, time, title, function(err, data) {
    if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
      }

    res.render('edit',{
      title: '更新',
      post: data
    });     
  });
});

//更新一篇文章
router.post('/edit/:name/:title/:time', checkLogin, function(req, res, next) {
  var name = req.params.name;
  var time = req.params.time;
  var title = req.params.title;
  var text = req.body.text;
  Post.setEdit(name, title, time, text, function(err) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }

    req.flash('success', '更新成功');
    res.redirect('/');
  });
});

//删除一篇文章
router.get('/remove/:name/:title/:time', checkLogin, function(req, res, next) {
  var name = req.params.name;
  var title = req.params.title;
  var time = req.params.time;
  Post.remove(name, title, time, function(err) {
    if(err){
      res.render('error', {
        message: '数据库异常',
        error: err
      });
    }

    req.flash('success', '删除成功');
    res.redirect('/');
  });
});

//创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

//删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next){

});

module.exports = router;