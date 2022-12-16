import express from 'express';
import mongoose from 'mongoose';
import findByID from '../middleware/findById';
import findAll from '../middleware/findAll';
import findByParam from '../middleware/findByParam';
import * as categoriesController from '../controllers/categoriesController';

const router = express.Router();
const Category = mongoose.model('Category');

// all categories
router.get('/', findAll(Category), categoriesController.getAllCategories);
router.get('/:id', findByID(Category), categoriesController.getOneCategory);

// vondors in a category
router.get('/:slug/vendors', findByParam(Category, 'slug'), categoriesController.getAllVendors);
// router.get('/:id/vendors/:id', findByID(Category), findByID(Category), categoriesController.getOneVendor);

// decks in a category
router.get('/:id/decks', findByID(Category), categoriesController.getAllDecks);
// router.get('/:id/:deck_id', CategorysRouter);

// write
router.post('/', categoriesController.post);

export default router;
