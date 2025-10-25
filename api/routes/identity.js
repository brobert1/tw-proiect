import { Identity } from '@controllers';
import { Router } from 'express';

const router = Router();
export default router;

router.post('/login', Identity.login);
router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);

router.get('/admin/profile', Identity.profile);
