import express from 'express';
import auth from '../middleware/auth.js';

import { addUser, removeUser, getUser, getUsersInChat, fetchListOfChats, createNewChat } from "../controllers/chat.js";

const router = express.Router();

router.post('/createNewChat', auth, createNewChat);
router.get('/fetchListOfChats', auth, fetchListOfChats);


export default router;