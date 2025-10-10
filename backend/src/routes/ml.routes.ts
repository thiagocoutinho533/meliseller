import { Router } from 'express';
import { getAuthUrl, oauthCallback } from '../controllers/mlController.js';

const router = Router();

router.get('/auth-url', getAuthUrl);
router.get('/callback', oauthCallback);

export default router;
