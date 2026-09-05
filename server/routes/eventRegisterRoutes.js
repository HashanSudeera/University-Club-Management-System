import express from "express";
import {registerForEvent} from "../controllers/eventRegisterController.js";
import {verifyToken} from "../middleware/authMiddleware.js";  //login requires

const router= express.Router();
router.post("/register",verifyToken,registerForEvent);

export default router;