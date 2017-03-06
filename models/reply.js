var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
  content: String,
  post_id: ObjectId,
  user_name: String,
  reply_id: {type: ObjectId, default: ObjectId},
  create_at: {type: Date, defaule: Date.now},
  update_at: {type: Date, defaule: Date.now},
  deleted: {type: Boolean, default: false}
});

mongoose.model('Reply', ReplySchema);