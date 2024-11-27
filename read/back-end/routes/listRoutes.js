import express from 'express';
import { addBookToList, removeBookFromList, getBooksByStatus } from '../controller/listController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', isAuthenticated, addBookToList); 
router.delete('/remove', isAuthenticated, removeBookFromList); 

router.get('/status/:statusLeitura', isAuthenticated, getBooksByStatus); 

export default router;
