import express from "express";
import {verifyToken,verifyRole} from "../middleware/authMiddleware.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../controllers/eventController.js";

const router = express.Router();

// Public routes (anyone can view events)
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected routes (user must be logged in with verifyToken)
router.post("/create", verifyToken, verifyRole("Club Admin"), createEvent);

export default router;