import express from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/adminauth.controller.js';

const router = express.Router();

router.post("/loginAdmin", loginAdmin);
router.get("/logoutAdmin", logoutAdmin);

export default router;