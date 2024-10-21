import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUser);

export default router;