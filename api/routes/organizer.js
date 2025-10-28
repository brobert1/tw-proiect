import { Organizer } from '@controllers';
import { authenticate, authorize } from '@middleware';
import { Router } from 'express';

const router = Router();
export default router;

router.all('/organizer', authenticate, authorize('organizer'));
router.all('/organizer/*', authenticate, authorize('organizer'));

router.post('/organizer/create-conference', Organizer.createConference);
router.get('/organizer/conferences', Organizer.listConferences);
