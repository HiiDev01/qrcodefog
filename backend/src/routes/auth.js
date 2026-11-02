import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { asyncHandler as h } from '../utils/asyncHandler.js';

const router = Router();
router.post('/register', authLimiter, h(register));
router.post('/login', authLimiter, h(login));
router.get('/me', requireAuth, me);

export default router;
