import express from 'express';
import { createPost, deletePost, editPost } from '../controller/postController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', isAuthenticated, createPost);
router.put('/:postId', isAuthenticated, editPost); 
router.delete('/:postId', isAuthenticated, deletePost);

export default router;