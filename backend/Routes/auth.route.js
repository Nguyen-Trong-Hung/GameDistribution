import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Register route
router.post('/register', register);

router.get('/logout', logout);

export default router;