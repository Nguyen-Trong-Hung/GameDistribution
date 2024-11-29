import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './Routes/auth.route.js';
import gameRoute from './Routes/game.route.js';
import userRoute from './Routes/user.route.js';
import authAdminRoute from './Routes/authAdmin.route.js';
import genresRoute from './Routes/genres.route.js';
import searchRoute from './Routes/search.route.js';
import ratingRoute from './Routes/rating.route.js';
import commentsRoute from './Routes/comments.route.js';

// Initialize the app
const app = express();

// Middleware
app.use(cors({ origin: ['http://45.77.32.24:1702', 'http://fe1.backendintern.online'], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', authAdminRoute);
app.use('/api/game', gameRoute);
app.use('/api/user', userRoute);
app.use('/api/search', searchRoute);
app.use('/api/genres', genresRoute);
app.use('/api/rating', ratingRoute);
app.use('/api/comments', commentsRoute);


// Start server
app.listen(8800, () => {
  console.log('Server is running on port 8800.');
});