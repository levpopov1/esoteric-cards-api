import type { Request, Response, NextFunction } from 'express';
import Deck from '../models/deck';

function getAllDecks(req: Request, res: Response) {
  res.status(200).json(req.items);
}

function getOneDeck(req: Request, res: Response) {
  res.status(200).json(req.item);
}

function getAllCards(req: Request, res: Response) {
  res.status(200).json(req.item.cards);
}

async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const newDeck = await Deck.create(req.body);
    return res.status(200).json(newDeck);
  } catch (error) {
    next(error);
  }
}

export { getAllDecks, getOneDeck, getAllCards, post };
