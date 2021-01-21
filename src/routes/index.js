const express = require('express');
const router = express.Router();
const { notFound, genericErrorHandler } = require('../middleware/errorHandlers');

// define route handlers
const categoriesRouter = require('./categoriesRouter');
const vendorsRouter = require('./vendorsRouter');
const decksRouter = require('./decksRouter');
const usersRouter = require('./usersRouter');

// basic response on Root endpoint
router.get('/', function(req, res){
    res.status(200).json({
        statusCode: 200,
        message: 'welcome to the API'
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



// // decks by vendor
// router.use('/vendors/:id/decks', playingCardsRouter);
// router.use('/vendors/:id/:deck_id', playingCardsRouter);

// // decks by id
// router.use('/decks/:deck_id', playingCardsRouter);



// if none of the above routes handle the request it will error out here
router.use(notFound);
router.use(genericErrorHandler);

module.exports = router;