import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

interface User{
    id: string,
    name: string,
    email: string,
    role: string
}

interface Post{
    id: string,
    title: string,
    content: string,
    imageUrl?: string
}

function Moderator() {
    const [users, setUsers] = useState<User[]>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [posts, setPosts] = useState<Post[]>();
    
    async function fetchUsers(){
        try {
            const response = await fetch(`http://localhost:5000/api/moderator/users`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const data = await response.json();
            
            setUsers(data.onlyUsers);
        } catch (error: any) {
            alert(error.message);
        }
    }

    async function createPost(e: React.FormEvent){
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/moderator/post', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, imageUrl }),
                credentials: "include"
            });
            const data = await res.json();

            if(data.message){
                alert(data.message);
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

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
        fetchUsers();
        getPosts();
    }, []) 
    
    return (
        <div className="w-full flex flex-col h-full">
        <span className="text-white text-lg font-semibold bg-gray-800 text-center p-5">
                MODERATOR DASHBOARD 
        </span>

        <div className="w-full flex justify-evenly border border-gray-600 p-2">
            <div className="border border-gray-700 rounded-xl bg-gray-900">
                <span className="text-white text-lg font-semibold m-2">
                    All Users - 
                </span>
                <div className="overflow-auto">
                    {
                        users?.map( item => <UserCard key={item.id} id={item.id} name={item.name} email={item.email} role={item.role} />)
                    }
                </div>
            </div>

            <div className="flex flex-col items-center justify-between border border-gray-700 w-1/5 rounded-xl bg-gray-900">
                <span className="text-white text-lg font-semibold m-2">
                    Create new post -
                </span>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <CreatePost title={title} 
                                setTitle={setTitle} 
                                content={content}  
                                setContent={setContent} 
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                createPost={createPost}
                                />
                </div>

            </div>

            <div className="border border-gray-700 rounded-xl bg-gray-900">
                <span className="text-white text-lg font-semibold m-2">
                    All posts -
                </span>
                <div>
                    {
                        posts?.map((item) => <PostCard key={item.id} title={item.title} content={item.content}/>)
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Moderator
