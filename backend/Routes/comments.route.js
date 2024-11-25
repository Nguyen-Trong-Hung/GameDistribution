import express from 'express';
import { getComments, postComment } from '../controllers/comments.controller.js';

const router = express.Router();

router.get('/:game_id', getComments);
router.post('/create-comment', postComment);

export default router;