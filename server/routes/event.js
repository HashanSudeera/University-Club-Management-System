import express from "express";
import {verifyToken,verifyRole} from "../middleware/authMiddleware.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  registerForEvent
} from "../controllers/eventController.js";

const router = express.Router();

// Public routes (anyone can view events)
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected routes (user must be logged in with verifyToken)
router.post("/create", verifyToken, verifyRole("Club Admin"), createEvent);
router.post("/:eventId/register", verifyToken, registerForEvent);

export default router;