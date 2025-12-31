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
router.get('/author/conferences/:id', Author.getConference);

// Author papers
router.get('/author/submissions', Author.listSubmissions);
router.post('/author/papers', Author.submitPaper);
router.put('/author/papers/:paperId/final', Author.uploadFinalVersion);
