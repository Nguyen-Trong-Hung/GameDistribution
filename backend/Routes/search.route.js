import express from 'express';
import { searchGame } from '../controllers/search.controller.js';

const router = express.Router();

router.get("/search-game", searchGame);

export default router;