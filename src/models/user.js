const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
  },
  api_key_usage: {
    requests: Number,
    lastAccessTime: Date,
  },
});

module.exports = mongoose.model('User', UserSchema, 'users');
