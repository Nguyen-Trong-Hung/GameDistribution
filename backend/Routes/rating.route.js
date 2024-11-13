import express from "express";

import { getRatingByGame, postRating } from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", postRating);
router.get("/:gameid", getRatingByGame);

export default router;