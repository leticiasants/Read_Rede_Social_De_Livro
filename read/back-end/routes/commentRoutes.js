import express from 'express';
import { createComment, deleteComment } from '../controller/commentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createComment);
router.delete('/:commentId', isAuthenticated, deleteComment); 
router.put('/:commentId', isAuthenticated, editComment);

export default router;