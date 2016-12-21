var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  name: String,
  title: String,
  text: String,
  create_at: String,
  update_at: String
});

mongoose.model('Post', postSchema);