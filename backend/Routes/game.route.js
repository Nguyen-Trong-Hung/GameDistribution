import express from 'express';
import { getGameById, getGames } from '../controllers/game.controller.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/game', getGames);
router.get('/game/:id', getGameById);

export default router;