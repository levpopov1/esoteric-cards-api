const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const categoriesController = require('../controllers/categoriesController');
const Category = mongoose.model('Category');

const findByID = require('../middleware/findById');
const findAll = require('../middleware/findAll');
const findByParam = require('../middleware/findByParam');

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


module.exports = router;