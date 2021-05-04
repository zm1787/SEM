import express from 'express';
import auth from '../middleware/auth.js';

import { addUser, removeUser, getUser, getUsersInChat } from "../controllers/chats.js";

const router = express.Router();

// router.post('/register', auth, registerBusiness);
// router.get('/myBusinesses', auth, myBusinesses);


export default router;