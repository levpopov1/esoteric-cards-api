const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ['m', 'f']
    }
});


module.exports = mongoose.model('Category', CategoriesSchema, 'categories');