import { Organizer } from '@controllers';
import { authenticate, authorize } from '@middleware';
import { Router } from 'express';

const router = Router();
export default router;

router.all('/organizer', authenticate, authorize('organizer'));
router.all('/organizer/*', authenticate, authorize('organizer'));

router.post('/organizer/create-conference', Organizer.createConference);
router.get('/organizer/dashboard', Organizer.getDashboardStats);
router.get('/organizer/conferences', Organizer.listConferences);
router.get('/organizer/conferences/:id', Organizer.getConference);
router.get('/organizer/conferences/:id/overview', Organizer.getConferenceOverview);
router.delete('/organizer/conferences/:id', Organizer.deleteConference);
router.put('/organizer/conferences/:id', Organizer.updateConference);
router.get('/organizer/conferences/:id/reviewers', Organizer.getConferenceReviewers);
router.get('/organizer/conferences/:id/submissions', Organizer.getConferenceSubmissions);
router.get('/organizer/conferences/:id/papers/:paperId/reviewers', Organizer.getPaperReviewers);
router.get('/organizer/conferences/:id/papers/:paperId/reviews', Organizer.getPaperReviews);
router.post('/organizer/conferences/:id/papers/:paperId/reviewers', Organizer.assignPaperReviewer);
router.post('/organizer/conferences/:id/invite-reviewer', Organizer.inviteReviewer);
router.put('/organizer/conferences/:id/papers/:paperId/decision', Organizer.updatePaperDecision);
router.delete(
  '/organizer/conferences/:id/reviewers/invitations/:invitationId',
  Organizer.cancelReviewerInvitation
);
