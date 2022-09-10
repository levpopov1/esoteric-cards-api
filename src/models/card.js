const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CardSchema = new Schema({
  card_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  suit: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
});

module.exports = mongoose.Schema(CardSchema);
