import express from 'express';
import { register, login, verifyToken } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', auth, verifyToken);

export default router;