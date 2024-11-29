
interface PostCardProps {
    title: string,
    content: string,
    imageUrl?: string
}

function PostCard({ title, content, imageUrl }: PostCardProps) {
    return (
        <div className='flex flex-col justify-center border p-2 m-4 rounded-lg bg-gray-600'>
            <div className="font-medium text-xl">
                title - {title}
            </div>
            <div className="text-white">
                content - {content}
            </div>

            {imageUrl && 
            <img ref={imageUrl}/>
            }
        </div>
    )
}

export default PostCard
