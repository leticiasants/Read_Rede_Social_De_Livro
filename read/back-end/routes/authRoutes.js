import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/authController.js';
import { updateUserBiography, deleteUser } from '../controller/userController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { getUserProfile } from '../controller/userController.js';



const router = express.Router();

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/update-User', isAuthenticated, updateUserBiography);

router.get('/profile', isAuthenticated, getUserProfile);

router.get('/logout', logoutUser);

router.delete('/delete', isAuthenticated, deleteUser);

export default router;
