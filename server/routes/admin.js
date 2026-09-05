import express from 'express';
import { getUserStats } from '../controllers/adminController.js'; 

const router = express.Router();

router.get('/user-stats', getUserStats);

export default router;