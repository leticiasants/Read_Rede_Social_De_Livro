import express from 'express';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { updateUserBiography, deleteUser } from '../controller/userController.js';


const router = express.Router();

router.post('/update-User', isAuthenticated, updateUserBiography);
router.delete('/delete', isAuthenticated, deleteUser);

export default router;
