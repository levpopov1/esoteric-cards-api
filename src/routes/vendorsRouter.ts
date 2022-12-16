import express from 'express';
import mongoose from 'mongoose';
import findByID from '../middleware/findById';
import findAll from '../middleware/findAll';
import * as vendorsController from '../controllers/vendorsController';

const router = express.Router();
const Vendor = mongoose.model('Vendor');

// all vendors
router.get('/', findAll(Vendor), vendorsController.getAllVendors);
router.get('/:id', findByID(Vendor), vendorsController.getOneVendor);

// decks in a Vendor
router.get('/:id/decks', findByID(Vendor), vendorsController.getAllDecks);
// router.get('/:id/:deck_id', VendorsRouter);

// write
router.post('/', vendorsController.post);

export default router;
