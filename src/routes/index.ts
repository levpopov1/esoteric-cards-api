import type { Request, Response } from 'express';
import { Router } from 'express';
import categoriesRouter from './categoriesRouter';
import vendorsRouter from './vendorsRouter';
import decksRouter from './decksRouter';
import usersRouter from './usersRouter';
import authRouter from './authRotuer';

const router = Router();

// basic response on Root endpoint
router.get('/', function (req: Request, res: Response) {
  res.status(200).json({
    statusCode: 200,
    message: 'welcome to the API',
  });
});

// apply handlers to specific routes

// goup by,
// category
// vendor
// deck

// list of categories
router.use('/categories', categoriesRouter);

// list of vendors
router.use('/vendors', vendorsRouter);

// list of decks
router.use('/decks', decksRouter);

// list of users and registration
router.use('/users', usersRouter);

// authentication endpoints
router.use('/auth', authRouter);

// // decks by vendor
// router.use('/vendors/:id/decks', playingCardsRouter);
// router.use('/vendors/:id/:deck_id', playingCardsRouter);

// // decks by id
// router.use('/decks/:deck_id', playingCardsRouter);

export default router;
