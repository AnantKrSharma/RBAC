import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

interface Post{
    id: string,
    title: string,
    content: string,
    imageUrl?: string
}

function User() {
    const [posts, setPosts] = useState<Post[]>();

    async function getPosts(){
        try {
            const response = await fetch(`http://localhost:5000/api/user/posts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const data = await response.json();
            
            setPosts(data.allPosts)
        } catch (error: any) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div>
            {
                posts?.map((item) => <PostCard key={item.id} title={item.title} content={item.content}/>)
            }
        </div>
    )
}

export default User
