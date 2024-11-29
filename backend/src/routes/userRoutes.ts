import express from 'express'
import { authenticateUser } from '../middleware/userMiddleware';
import { getPosts } from '../controllers/userControllers';

const router = express.Router();

router.get('/posts', authenticateUser, getPosts);

export default router;
