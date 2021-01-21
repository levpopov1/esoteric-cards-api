const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    api_key: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    usage: {
        requests: Number,
        lastAccessTime: Date
    }
});


module.exports = mongoose.model('User', UserSchema, 'users');