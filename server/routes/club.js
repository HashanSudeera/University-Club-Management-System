import express from "express";

import { createClub } from "../controllers/clubController.js";

import {
  verifyToken,
  verifyRole
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyRole("Club Admin"),
  createClub
);

export default router;