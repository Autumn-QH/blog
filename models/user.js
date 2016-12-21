var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  url: String,
  profile_image_url: String,
  signature: String,//签名
  create_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

mongoose.model('User', userSchema);