import express from 'express';
import auth from '../middleware/auth.js';

import { getUsers, registerUser, loginUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUser)
router.post('/login', loginUser);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;