import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CardSchema = new Schema({
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

export default mongoose.model('Card', CardSchema, 'cards');
