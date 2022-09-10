const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategoriesSchema = new Schema({
  category_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
  },
  vendors: {
    type: [String],
  },
  decks: {
    type: [String],
  },
});

module.exports = mongoose.model('Category', CategoriesSchema, 'categories');
