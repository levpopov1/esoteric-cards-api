const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CardSchema = require('./card');

var DecksSchema = new Schema({
  deck_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  img: {
    type: String,
  },
  cards: {
    type: [CardSchema],
  },
});

module.exports = mongoose.model('Deck', DecksSchema, 'decks');
