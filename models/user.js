var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  password: String,
  credit: Number,
  session: { isOn:{ type: Boolean, default: false }, session_start: Date, session_end: Date }
});

module.exports = mongoose.model('User', UserSchema);