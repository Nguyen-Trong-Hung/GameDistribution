import express from "express";

import { getGenres, getGenreByGame } from "../controllers/genres.controller.js";

const router = express.Router();

router.get("/", getGenres);
router.get("/:gameid", getGenreByGame);

export default router;