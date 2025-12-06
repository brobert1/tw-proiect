import { Reviewer } from '@controllers';
import { authenticate, authorize } from '@middleware';
import { Router } from 'express';

const router = Router();
export default router;

// Authenticated Reviewer Routes
router.all('/reviewer', authenticate, authorize('reviewer'));
router.all('/reviewer/*', authenticate, authorize('reviewer'));

// Reviewer conferences
router.get('/reviewer/conferences', Reviewer.listConferences);
