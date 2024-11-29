import express from 'express'
import { authenticateUser } from '../middleware/userMiddleware';
import { authorizeAdmin } from '../middleware/adminMiddleware';
import { createPost, deleteUser, getAllUsers } from '../controllers/adminControllers';

const router = express.Router();

router.get('/allusers', authenticateUser, authorizeAdmin, getAllUsers);  //admin route to fetch all set of users, whether moderator or normal users

router.post('/delete', authenticateUser, authorizeAdmin, deleteUser);  //admin route to delete a particular user or moderator

router.post('/post', authenticateUser, authorizeAdmin, createPost);  //admin route to create a new post

export default router;
