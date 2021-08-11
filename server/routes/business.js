import express from 'express';
import auth from '../middleware/auth.js';

import { registerBusiness, myBusinesses, fetchBusinessDetails, payment, getNearbyBusinesses, updateBusiness } from "../controllers/business.js";

const router = express.Router();

router.post('/register', auth, registerBusiness);
router.patch('/:id', auth, updateBusiness);
router.get('/myBusinesses', auth, myBusinesses);
router.get('/getNearbyBusinesses', getNearbyBusinesses);
router.get('/fetchBusinessDetails/:id', auth, fetchBusinessDetails);

router.post('/payment', auth, payment);

export default router;