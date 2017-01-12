var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var porxy = require('../porxy');
var Post = porxy.Post;
var Reply = porxy.Reply;

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

//单独一篇的文章页
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  if(id.length !== 24){
    res.render('error', {
        message: '此话题不存在或已被删除。'
    });
  }
  Post.getOne(id, function(err, data) {
    if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
    }
    if(data === null){
      res.render('error', {
        message: '此话题不存在或已被删除。'
      });
    }
    //获取回复
    Reply.getReplyByPostId(data.id, function(err, reply) {
      if(err){
        res.render('error', {
          message: '数据库异常',
          error: err
        });
      }
      
      res.render('article',{
        title: data.title,
        post: data,
        replys: reply
      });     
    });
  });
});

//更新文章页
router.get('/edit/:id', checkLogin, function(req, res, next) {
  var id = req.params.id;

  Post.getEdit(id, function(err, data) {
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
router.post('/edit/:id', checkLogin, function(req, res, next) {
  var id = req.params.id;
  var text = req.body.text;

  Post.setEdit(id, text, function(err) {
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
router.get('/remove/:id', checkLogin, function(req, res, next) {
  var id = req.params.id;
 
  Post.remove(id, function(err) {
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


module.exports = router;