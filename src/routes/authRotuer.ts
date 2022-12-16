import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import validate from '../middleware/validation';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/login', validate('login'), authController.login);
router.post('/register', validate('createUser'), authController.register);
router.post('/refresh_token', isAuthenticated, authController.refreshToken);
router.post('/logout', isAuthenticated, authController.logout);
router.get('/secret', isAuthenticated, authController.secret);

export default router;
