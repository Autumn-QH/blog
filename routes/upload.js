var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img');
  },
  filename: function (req, file, cb) {
    //cb(null, file.originalname + '-' + Date.now());
    cb(null, file.originalname);
  }
});

var upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  res.render('upload', {
    title: '上传图片'
  });
});

router.post('/', upload.single('field1'), function(req, res, next) {
  req.flash('success', '文件上传成功!');
  res.redirect('/');
});


module.exports = router;