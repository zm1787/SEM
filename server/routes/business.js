import express from 'express';
import auth from '../middleware/auth.js';

import { registerBusiness, payment } from "../controllers/businesses.js";

const router = express.Router();

router.post('/register', auth, registerBusiness);
router.post('/payment', payment);

export default router;