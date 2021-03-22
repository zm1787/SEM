import express from 'express';
import auth from '../middleware/auth.js';

import { getUsers, loadUser, loadProfile, registerSeeker, loginUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.get('/load', auth, loadUser);
router.get('/loadprofile', auth, loadProfile);
router.get('/', getUsers)
//router.post('/register/specialist', registerSpecialist)
router.post('/register/seeker', registerSeeker)
router.post('/login', loginUser);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;