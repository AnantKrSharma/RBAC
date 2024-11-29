import express from 'express';
import { authenticateUser } from '../middleware/userMiddleware';
import { authorizeModerator } from '../middleware/moderatorMiddleware';
import { createPost, getOnlyUsers } from '../controllers/moderatorControllers';

const router = express.Router();

router.get('/users', authenticateUser, authorizeModerator, getOnlyUsers);  //moderator route to fetch all users with 'user' role

router.post('/post', authenticateUser, authorizeModerator, createPost)  //moderator route to create a new post

export default router;
