import express from 'express';
import { updateUserProfile, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// දත්ත ගන්න GET route එක (මෙතන :userId කියන්නේ අපි ෆ්‍රොන්ටෙන්ඩ් එකෙන් එවන ID එකට)
router.get('/profile/:userId', getUserProfile);
// PUT request එකක් විදිහට මේ route එක හදනවා
// URL එක වෙන්නේ: /api/users/update-profile
router.put('/update-profile', updateUserProfile);

export default router;