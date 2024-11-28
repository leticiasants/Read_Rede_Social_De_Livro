import express from 'express';
import { createPost, deletePost, editPost, LatestPost, listAvailableBooks, listPostsWithComments} from '../controller/postController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', createPost);

router.put('/:postId', isAuthenticated, editPost); 

router.get('/latest/:userId', isAuthenticated, LatestPost)

router.get('/books', isAuthenticated, listAvailableBooks)

router.get('/publications', isAuthenticated, listPostsWithComments)

router.delete('/:postId', isAuthenticated, deletePost);

export default router;