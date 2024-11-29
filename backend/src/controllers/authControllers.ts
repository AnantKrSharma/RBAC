import { prismaClient } from '../utils/prisma.ts';
import { createTokenAndSetCookie } from '../utils/tokenAndCookie.ts';
import {signinBody, signupBody} from '../utils/zodTypes.ts'
import bcryptjs from 'bcryptjs'

export async function signup(req, res){
    try {
        const body = req.body;
        
        const parsedBody = signupBody.safeParse(body);  //validating user input
        if(!parsedBody.success || parsedBody.data.password !== parsedBody.data.confirmPassword){
            return res.status(403).json({
                error: "Invalid inputs"
            })
        }
        
        const exists = await prismaClient.user.findUnique({  //checking if user already exists
            where: {
                email: body.email
            }
        });
        if(exists){
            return res.status(403).json({
                error: "User already exists"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(body.password, salt);  //password hashing

        const user = await prismaClient.user.create({  //creating new user (role : 'user' by default)
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        })

        createTokenAndSetCookie(user.id, user.role, res);  //JWT creation (with user's role) and generating cookie response

        res.status(200).json({
            message: "Signed-up successfully",
            name: user.name,
            role: user.role
        })
    
    } catch (error: any) {
        console.log("Error in sign-up route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while signing-up"
        })
    }
}

export async function signin(req, res){
    try {
        const body = req.body;

        const parsedBody = signinBody.safeParse(body);
        if(!parsedBody.success){
            return res.status(403).json({
                error: "Invalid inputs"
            })
        }

        const user = await prismaClient.user.findFirst({  //checking if user exists in the database
            where: {
                email: body.email
            }
        })

        const isPasswordValid = await bcryptjs.compare(body.password, user?.password || '')  //checking the password
        
        if(!user || !isPasswordValid){
            return res.status(404).json({
                error: "Incorrect email or password"
            });
        }

        createTokenAndSetCookie(user?.id, user?.role, res);  //JWT creation (with user's role) and cookie response

        res.status(200).json({
            message: "Signed-in successfully",
            name: user?.name,
            role: user?.role
        })

    } catch (error: any) {
        console.log("Error in sign-in route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while signing-in"
        })
    }
}

export function logout(req, res){
    try {
        res.cookie('jwt', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            domain: process.env.NODE_ENV === "development" ? "localhost" : undefined
        });

        res.status(200).json({
            message: "Logged-out successfully"
        })
    } catch (error: any) {
        console.log("Error in logout route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while logging out"
        })
    }
}
