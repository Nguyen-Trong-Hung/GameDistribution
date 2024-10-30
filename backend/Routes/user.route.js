import express from 'express';
import { getUser, changePassword } from '../controllers/user.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/users', getUser);
router.post('/change-password',verifyToken, changePassword);

export default router;