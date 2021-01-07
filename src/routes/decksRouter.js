const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const decksController = require('../controllers/decksController');
const Deck = mongoose.model('Deck');

const findByID = require('../middleware/findById');
const findAll = require('../middleware/findAll');

// all Decks
router.get('/', findAll(Deck), decksController.getAllDecks);
router.get('/:id', findByID(Deck), decksController.getOneDeck);

// decks in a Deck
router.get('/:id/cards', findByID(Deck), decksController.getAllCards);
// router.get('/:id/:deck_id', DecksRouter);

// write
router.post('/', decksController.post);


module.exports = router;