import express from 'express';
import auth from '../middleware/auth.js';

import { registerSeeker } from "../controllers/businesses.js";

const router = express.Router();

router.post('/register', auth, registerSeeker);

export default router;