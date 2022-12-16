import express from 'express';
import mongoose from 'mongoose';
import findByID from '../middleware/findById';
import findAll from '../middleware/findAll';
import { validateKey } from '../middleware/apiKeys';
import * as usersController from '../controllers/usersController';

const router = express.Router();
const User = mongoose.model('User');

// all users
router.get('/', validateKey, findAll(User), usersController.getAllUsers);
router.get('/:id', validateKey, findByID(User), usersController.getOneUser);

// register a new user
router.post('/register', usersController.registerUser);

export default router;
