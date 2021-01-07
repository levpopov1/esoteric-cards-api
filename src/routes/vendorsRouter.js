const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const vendorsController = require('../controllers/vendorsController');
const Vendor = mongoose.model('Vendor');

const findByID = require('../middleware/findById');
const findAll = require('../middleware/findAll');
const { route } = require('./categoriesRouter');

// all vendors
router.get('/', findAll(Vendor), vendorsController.getAllVendors);
router.get('/:id', findByID(Vendor), vendorsController.getOneVendor);

// decks in a Vendor
router.get('/:id/decks', findByID(Vendor), vendorsController.getAllDecks);
// router.get('/:id/:deck_id', VendorsRouter);

// write
router.post('/', vendorsController.post);


module.exports = router;