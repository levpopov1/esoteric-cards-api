const Deck = require('../models/Deck');

function getAllDecks(req, res) {
  res.status(200).json(req.items);
}

function getOneDeck(req, res) {
  res.status(200).json(req.item);
}

function getAllCards(req, res) {
  res.status(200).json(req.item.cards);
}

async function post(req, res, next) {
  try {
    const newDeck = await Deck.create(req.body);
    return res.status(200).json(newDeck);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllDecks,
  getOneDeck,
  getAllCards,
  post,
};
