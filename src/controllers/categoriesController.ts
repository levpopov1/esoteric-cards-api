import type { Request, Response, NextFunction } from 'express';
import Category from '../models/category';
import Vendor from '../models/vendor';

function getAllCategories(req: Request, res: Response) {
  res.status(200).json(req.items);
}

function getOneCategory(req: Request, res: Response) {
  res.status(200).json(req.item);
}

async function getAllVendors(req: Request, res: Response) {
  console.log(req.item);
  if (req.item.length > 0) {
    let vendors = await Vendor.find({ id: req.item.vendors });
    res.status(200).json(vendors);
  } else {
    res.status(404).json({ error: 404, message: 'invalid category' });
  }
}

function getAllDecks(req: Request, res: Response) {
  res.status(200).json(req.item.decks);
}

async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(200).json(newCategory);
  } catch (error) {
    next(error);
  }
}

export { getAllCategories, getOneCategory, getAllVendors, getAllDecks, post };
