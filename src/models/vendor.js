const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VendorsSchema = new Schema({
  vendor_id: {
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
  order: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
  },
  img: {
    type: String,
  },
  decks: {
    type: [String],
  },
});

module.exports = mongoose.model('Vendor', VendorsSchema, 'vendors');
