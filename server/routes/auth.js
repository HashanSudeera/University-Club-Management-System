import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  login,
  logout,
  refreshToken,
  register,
  getProfile,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshToken);
router.get("/me", verifyToken, getProfile);


export default router;
