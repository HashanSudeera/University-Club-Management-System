import express from "express";
import {registerForEvent,getEventParticipants} from "../controllers/eventRegisterController.js";
import {verifyToken,verifyRole} from "../middleware/authMiddleware.js";  //login requires

const router= express.Router();
router.post("/register",verifyToken,registerForEvent);
router.get("/event/:eventId", verifyToken, verifyRole("Club Admin"), getEventParticipants);

export default router;