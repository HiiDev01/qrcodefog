import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler as h } from '../utils/asyncHandler.js';
import * as c from '../controllers/qrController.js';

const router = Router();
router.use(requireAuth);

router.post('/save', h(c.save));
router.get('/', h(c.list));
router.get('/:id', h(c.getOne));
router.put('/:id', h(c.update));
router.put('/:id/destination', h(c.updateDestination));
router.delete('/:id', h(c.remove));

export default router;
