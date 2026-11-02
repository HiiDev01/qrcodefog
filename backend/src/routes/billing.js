import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler as h } from '../utils/asyncHandler.js';
import { status, checkout, portal } from '../controllers/billingController.js';

const router = Router();
router.use(requireAuth);
router.get('/status', h(status));
router.post('/checkout', h(checkout));
router.post('/portal', h(portal));
export default router;
