import { Author } from '@controllers';
import { authenticate, authorize } from '@middleware';
import { Router } from 'express';

const router = Router();
export default router;

// Authenticated Author Routes
router.all('/author', authenticate, authorize('author'));
router.all('/author/*', authenticate, authorize('author'));

// Author conferences
router.get('/author/conferences', Author.listConferences);
