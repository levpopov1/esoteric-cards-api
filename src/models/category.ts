import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
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

export default mongoose.model('Category', CategoriesSchema, 'categories');
