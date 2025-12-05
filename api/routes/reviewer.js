import { authenticate, authorize } from '@middleware';
import { Router } from 'express';

const router = Router();
export default router;

// Authenticated Reviewer Routes
router.all('/reviewer', authenticate, authorize('reviewer'));
router.all('/reviewer/*', authenticate, authorize('reviewer'));

// TODO: Add reviewer dashboard routes here (e.g., list papers, submit reviews)
