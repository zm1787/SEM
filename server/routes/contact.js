import express from 'express';
import auth from '../middleware/auth.js';

import { 
    sendContactRequest,
} from "../controllers/contact.js";

const router = express.Router();

router.post('/sendContactRequest', auth,  sendContactRequest);


export default router;
