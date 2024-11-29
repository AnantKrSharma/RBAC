import express from "express";
import { logout, signin, signup } from "../controllers/authControllers";

const router = express.Router();

//routes
router.post('/signup', signup);

router.post('/signin', signin);

router.post('/logout', logout);

export default router;
