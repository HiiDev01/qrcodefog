import { Router } from 'express';
import { asyncHandler as h } from '../utils/asyncHandler.js';
import { redirect } from '../controllers/redirectController.js';

const router = Router();
router.get('/:shortCode', h(redirect));
export default router;
