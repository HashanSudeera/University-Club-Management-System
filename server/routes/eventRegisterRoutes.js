import express from "express";
import {registerForEvent} from "../controllers/eventRegisterController.js";
import {verifyToken,verifyRole} from "../middleware/authMiddleware.js";  //login requires
import { cancelRegistration, getMyRegistrations, getEventParticipants } from "../controllers/eventRegisterController.js";


const router= express.Router();
router.post("/register",verifyToken,registerForEvent);
router.delete("/:regId", verifyToken, cancelRegistration);
router.get("/my", verifyToken, getMyRegistrations);
router.get("/event/:eventId", verifyToken, verifyRole("Club Admin"), getEventParticipants);

export default router;