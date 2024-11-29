import { prismaClient } from "../utils/prisma";
import { newPostBody } from "../utils/zodTypes";

export async function getOnlyUsers(req, res){
    try{
        const onlyUsers = await prismaClient.user.findMany({
            where: {
                role: 'User'
            }
        });

        res.status(200).json({
            onlyUsers
        })

    }catch(error: any){
        console.log("Error in moderator fetch users route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while fetching the users"
        })
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
        console.log("Error in moderator new post route controller - ", error.message);
        
        res.status(500).json({
            error: "Error while creating a new post"
        })
    }
}
