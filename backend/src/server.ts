import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import adminRoutes from './routes/adminRoutes.ts'
import moderatorRoutes from './routes/moderatorRoutes.ts'
import dotenv from 'dotenv'
import cors from 'cors';


const app = express();

const port = process.env.PORT ?? 5000;
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());  //to parse the incoming requests with JSON payloads (req.body)
app.use(cookieParser())  //to access cookies in handlers

// routes
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/admin/', adminRoutes);
app.use('/api/moderator/', moderatorRoutes);

app.listen(port, () => {
    console.log(`Running on port - ${port}`);
})
