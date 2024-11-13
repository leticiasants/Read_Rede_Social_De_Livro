import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);

export default router;
