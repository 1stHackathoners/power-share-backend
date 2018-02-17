var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  credit: Number,
  session: { isOn:{ type: Boolean, default: false }, session_start:{ type: Number, default: Date.now() }, session_end:{ type: Number, default: Date.now() } }
});

UserSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model('User', UserSchema);