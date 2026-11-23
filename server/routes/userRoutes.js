import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// GET route 
router.get('/profile/:userId', getUserProfile);
router.put('/update-profile', updateUserProfile);

export default router;