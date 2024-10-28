import express from 'express';
import { uploadImage } from '../controllers/uploadImage.controller.js';
import upload from '../Middleware/Multerconfig.js';

const router = express.Router();

router.post('/upload', upload.single('image'), uploadImage);

export default router;