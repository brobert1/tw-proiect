import { Public } from '@controllers';
import { Router } from 'express';

const router = Router();
export default router;

// Public Conference Routes
router.get('/public/conferences', Public.listConferences);

// Public Reviewer Invitation Routes
router.get('/public/reviewer-invitation/:token', Public.getInvitation);
router.post('/public/reviewer-invitation/:token/respond', Public.respondInvitation);
router.post('/public/reviewer-invitation/:token/set-password', Public.setPassword);

// Email Verification Routes
router.get('/public/verify-email/:token', Public.verifyEmail);
