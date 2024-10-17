import express from 'express';
import { getGames } from '../controllers/game.controller.js';

const router = express.Router();

router.get('/game', getGames);

export default router;