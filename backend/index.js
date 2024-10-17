import express from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './Middleware/Corsconfig.js';
import authRoute from './Routes/auth.route.js';
import gameRoute from './Routes/game.route.js';
import upload from './Middleware/Multerconfig.js'; // Import cấu hình multer từ Middleware
import uploadImage from './controllers/uploadImage.controller.js';

// Initialize the app
const app = express();

// Middleware
app.use(corsMiddleware);  // CORS
app.use(bodyParser.json());  // Body parser

// Routes
app.use('/api/auth', authRoute);  // Auth routes
app.use('/api', gameRoute); // Game routes

// Route to handle file upload
app.post('/api/upload', upload.single('image'), uploadImage);

// Start server
app.listen(8800, () => {
  console.log('Server is running on port 8800.');
});