const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const authController = require('../controllers/authController');
const User = mongoose.model('User');

const findByID = require('../middleware/findById');
const findAll = require('../middleware/findAll');
const { validateKey } = require('../middleware/apiKeys');
const isAuthenticated = require('../middleware/isAuthenticated');
const validate = require('../middleware/validation');

// all users
router.post('/login', authController.login);
router.post('/register', validate('createUser'), authController.register);
router.post('/refresh_token', isAuthenticated,  authController.refreshToken);
router.post('/logout', isAuthenticated,  authController.logout);
router.get('/secret',  isAuthenticated,  authController.secret);

module.exports = router;