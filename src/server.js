// main entry point for API server
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const connectDB  = require('./db')
const simulateSlowNetwork = require('./middleware/simulateSlowNetwork');

// sets environment variables based on centents of .env file
require('dotenv').config();

// db
connectDB();

// start server instance
const app = express();

/*  
// uncomment this line if running behind a proxy 
// the x-forwarded-for header in nginx config must be set
// node will set req.ip to real remote address
app.set('trust proxy', true);
*/

// cross origin request middleware
app.use(cors());
// dev middleware
app.use(morgan('dev'));
// url middleware
app.use(express.json());
// session management middleware
app.use(passport.initialize());
app.use(passport.session());


// route handlers entrypoint for all routes
app.use('/api/v1', simulateSlowNetwork(3000), routes);

// begin listening on given port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log(`The app is running in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
