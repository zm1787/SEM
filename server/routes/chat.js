import express from 'express';
import auth from '../middleware/auth.js';

import { 
    fetchChat,
} from "../controllers/chat.js";

const router = express.Router();

router.get('/fetchChat', auth, fetchChat);


export default router;
