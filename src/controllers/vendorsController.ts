import type { Request, Response, NextFunction } from 'express';
import Vendor from '../models/vendor';

function getAllVendors(req: Request, res: Response) {
  res.status(200).json(req.items);
}

function getOneVendor(req: Request, res: Response) {
  res.status(200).json(req.item);
}

function getAllDecks(req: Request, res: Response) {
  res.status(200).json(req.item.decks);
}

async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const newVendor = await Vendor.create(req.body);
    return res.status(200).json(newVendor);
  } catch (error) {
    next(error);
  }
}

export { getAllVendors, getOneVendor, getAllDecks, post };
