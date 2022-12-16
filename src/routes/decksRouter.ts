import express from 'express';
import mongoose from 'mongoose';
import findByID from '../middleware/findById';
import findAll from '../middleware/findAll';
import * as decksController from '../controllers/decksController';

const router = express.Router();
const Deck = mongoose.model('Deck');

// all Decks
router.get('/', findAll(Deck), decksController.getAllDecks);
router.get('/:id', findByID(Deck), decksController.getOneDeck);

// decks in a Deck
router.get('/:id/cards', findByID(Deck), decksController.getAllCards);
// router.get('/:id/:deck_id', DecksRouter);

// write
router.post('/', decksController.post);

export default router;
