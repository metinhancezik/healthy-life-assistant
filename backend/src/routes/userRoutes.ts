import express, { Router } from 'express';
import { getUserProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.get('/profile', auth as express.RequestHandler, getUserProfile);

export default router;