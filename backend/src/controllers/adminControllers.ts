import { prismaClient } from '../utils/prisma.ts';
import { newPostBody } from '../utils/zodTypes.ts';

export async function getAllUsers(req, res){
    try{
        const allUsers = await prismaClient.user.findMany({
            where: {
                OR: [
                    {
                        role: 'User'
                    },
                    {
                        role: 'Moderator'
                    }
                ]
            }
        });

        res.status(200).json({
            allUsers
        })

    }catch(error: any){
        console.log("Error in admin fetch users route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while fetching the users"
        })
    }
}

export async function deleteUser(req, res){
    try{
        const { userId } = req.query;  //userId is passed as a query parameter
        if (!userId) {
            return res.status(400).json({ 
                error: "User ID is required." 
            });
        }

        const userToDelete = await prismaClient.user.findUnique({  //check if user exists
            where: { 
                id: userId 
            },
        });
        if (!userToDelete) {
            return res.status(404).json({ 
                error: "User not found." 
            });
        }

        await prismaClient.user.delete({
            where: { 
                id: userId 
            },
        });

        res.json({ 
            message: "User deleted successfully." 
        });

    } catch (error: any) {
        console.error("Error in admin delete user route controller - ", error.message);
        
        res.status(500).json({ 
            error: "Error while deleting the user." 
        });
    }
}

export async function createPost(req, res){
    try {
        const body = req.body;

        const parsedBody = newPostBody.safeParse(body);  //validating body for creating a new post
        if(!parsedBody.success){
            return res.status(403).json({
                error: "Enter appropriate post title and description"
            })
        }

        const newPost = await prismaClient.post.create({  //create a new post
            data: {
                creatorId: req.userId,
                title: body.title,
                content: body.content,
                imageUrl: body.imageUrl,
            }
        })

        res.status(200).json({
            message: "New post created",
            newPost
        })
    } catch (error: any) {
        console.log("Error in admin new post route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while creating a new post"
        })
    }
}
