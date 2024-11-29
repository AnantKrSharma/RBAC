import { prismaClient } from "../utils/prisma";

export async function getPosts(req, res){
    try {
        const allPosts = await prismaClient.post.findMany({});

        res.status(200).json({
            allPosts
        })
    } catch (error: any) {
        console.log("Error in user's fetch post controller - ", error.message);
        
        res.status(500).json({
            error: "Error while fetching posts"
        })
    }
}
