import express from 'express';
import { getUser, changePassword, lockUser, unlockUser } from '../controllers/user.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/users', getUser);
router.post('/change-password',verifyToken, changePassword);
router.post('/lock-user',verifyToken, lockUser);
router.post('/unlock-user',verifyToken, unlockUser);

export default router;