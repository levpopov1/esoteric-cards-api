import mongoose from 'mongoose';
import { CardSchema } from './card';

const Schema = mongoose.Schema;

const DecksSchema = new Schema({
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

export default mongoose.model('Deck', DecksSchema, 'decks');
