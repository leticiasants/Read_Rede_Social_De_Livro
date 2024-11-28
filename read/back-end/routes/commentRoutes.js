import express from 'express';
import { createComment, deleteComment, editComment } from '../controller/commentController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { canEditComment, canDeleteComment } from '../middleware/authorizationMiddleware.js';


const router = express.Router({ mergeParams: true });

router.post('/', isAuthenticated, createComment);
router.delete('/:commentId', isAuthenticated, canDeleteComment, deleteComment); 
router.put('/:commentId', isAuthenticated, canEditComment, editComment);

export default router;