import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler as h } from '../utils/asyncHandler.js';
import { overview, qrAnalytics } from '../controllers/analyticsController.js';

const router = Router();
router.use(requireAuth);
router.get('/overview', h(overview)); // declared before /:qrId so "overview" is not read as an id
router.get('/:qrId', h(qrAnalytics));

export default router;
