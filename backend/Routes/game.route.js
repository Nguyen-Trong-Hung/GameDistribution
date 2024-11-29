import express from 'express';
import { getGameById, getGames, createNewGame, deleteGame, getSimilarGamesByGenres, getGameByPublisher, getGamesNeedApproved, approveGame } from '../controllers/game.controller.js';
import upload from '../Middleware/Multerconfig.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/', getGames);
router.get('/approve-game', getGamesNeedApproved);
router.get("/similar/:gameId", getSimilarGamesByGenres);
router.get("/publisher/:userId", getGameByPublisher);
router.get('/:id', getGameById);
router.post('/create-game', upload.single('GameImage'), createNewGame);
router.post('/approve/:id', approveGame);
router.delete('/delete/:id', deleteGame);

export default router;