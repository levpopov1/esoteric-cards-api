const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const usersController = require('../controllers/usersController');
const User = mongoose.model('User');

const findByID = require('../middleware/findById');
const findAll = require('../middleware/findAll');
const { validateKey } = require('../middleware/apiKeys');

// all users
router.get('/', validateKey, findAll(User), usersController.getAllUsers);
router.get('/:id', validateKey, findByID(User), usersController.getOneUser);

// register a new user
router.post('/register', usersController.registerUser);

module.exports = router;