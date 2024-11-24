import express, { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

// Profile endpoints
router.get('/profile', auth, getUserProfile as express.RequestHandler);
router.put('/profile', auth, updateUserProfile as express.RequestHandler);

export default router;