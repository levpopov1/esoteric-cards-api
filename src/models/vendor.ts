import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VendorsSchema = new Schema({
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

export default mongoose.model('Vendor', VendorsSchema, 'vendors');
