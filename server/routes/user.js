import express from 'express';
import auth from '../middleware/auth.js';

import { loadProfile, registerSeeker, loginUser, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.post('/login', loginUser);
router.get('/loadprofile', auth, loadProfile);
router.post('/register/seeker', registerSeeker)
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;