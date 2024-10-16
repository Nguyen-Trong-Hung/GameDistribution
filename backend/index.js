import express from 'express';
import bodyParser from 'body-parser';
import { corsMiddleware } from './Middleware/Corsconfig.js';
import authRoute from './Routes/auth.route.js';

// Initialize the app
const app = express();

// Middleware
app.use(corsMiddleware);  // CORS
app.use(bodyParser.json());  // Body parser

// Routes
app.use('/api/auth', authRoute);  // Auth routes

// Start server
app.listen(8800, () => {
  console.log('Server is running on port 8800.');
});
