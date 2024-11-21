import express from 'express';
import { createPost, deletePost, editPost, LatestPost} from '../controller/postController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', createPost);

router.get('/latest/:userId', isAuthenticated, LatestPost)

router.put('/:postId', isAuthenticated, editPost); 

router.delete('/:postId', isAuthenticated, deletePost);


export default router;