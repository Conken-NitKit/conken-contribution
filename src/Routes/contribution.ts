import express from 'express';

import { contributionController } from '../Controllers/contribution';

const router = express.Router();

router.get('/getTest', contributionController.getTest);

export const contributionRouter = router;
