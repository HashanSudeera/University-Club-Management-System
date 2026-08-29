import express from 'express';
import { getAdminClub } from '../controllers/clubadminController.js';

const router = express.Router();

// Define the GET route. Note the :adminId parameter.
router.get('/:adminId', getAdminClub);

export default router;