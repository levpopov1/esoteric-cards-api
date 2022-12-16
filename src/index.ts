import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db';
import routes from './routes';
// const simulateSlowNetwork = require('./middleware/simulateSlowNetwork');

// sets environment variables based on centents of .env file
dotenv.config();

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
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
// dev middleware
app.use(morgan('dev'));
// url middleware
app.use(express.json());
// cookies middleware
app.use(cookieParser());

// use this to slow down requests to test frontend loading apinners etc.
// app.use(simulateSlowNetwork(3000));

// route handlers entrypoint for all routes
app.use('/api/v1', routes);

// begin listening on given port
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`The app is running in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
