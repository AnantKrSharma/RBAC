import jwt from 'jsonwebtoken';
import { prismaClient } from '../utils/prisma';

export async function authenticateUser(req, res, next){
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error: "Unauthenticated"
            })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET || '');
        if(!verified){
            return res.status(401).json({
                error: "Unauthenticated"
            })
        }
        
        //@ts-expect-error: can't set payload types in advance
        const { userId, role } = verified;

        const exists = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!exists){
            return res.status(403).json({
                error: "Unauthenticated"
            })
        }

        req.userId = userId;
        req.role = role;

        next();

    } catch (error: any) {
        console.log("Error in user-middleware - ", error.message);
        
        res.status(500).json({
            error: "Error while authenticating the user"
        })
    }
}
