import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

import {
  login,
  logout,
  refreshToken,
  register,
  getProfile,
  generate_OTP,
  verifyOTP,
  resetPassword,
} from "../controllers/authController.js";

import { registerMail , sendOTPMail } from '../controllers/mailer.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshToken);
router.get("/me", verifyToken, getProfile);

//email verifications
router.post("/generateOTP",generate_OTP);
router.post("/verifyOTP",verifyOTP);

router.put("/resetpwd",resetPassword);

router.post('/registermail',registerMail );
router.post('/sendOTPMail',sendOTPMail );



export default router;
