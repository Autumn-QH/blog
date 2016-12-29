var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: String,
  title: String,
  text: String,
  create_at: String,
  update_at: String
});

//索引,唯一的
postSchema.index({title: 1},{unique: true});

postSchema.pre('update', function(next) {
  /*var now = new Date().getTime()+'';
  this.update_at = now;*/
  next();
});

mongoose.model('Post', postSchema);