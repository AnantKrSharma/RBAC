
interface CreatePostProps{
    title: string,
    setTitle: (title: string) => void,
    content: string,
    setContent: (content: string) => void,
    imageUrl: string,
    setImageUrl: (content: string) => void,
    createPost: (e: React.FormEvent) => void
}

function CreatePost({title, setTitle, content, setContent, imageUrl, setImageUrl, createPost}: CreatePostProps) {
    return (
        <div className="flex flex-col items-center justify-center">

            <form onSubmit={createPost}>
                        <div>
                                <label className="label p-2">
                                    <span className='text-base label-text'>Title</span>
                                </label>
                                <input type="text" placeholder='Enter title' className='input input-bordered h-10 w-full'
                                value={title} onChange={ (e) => {setTitle(e.target.value)} }/>
                        </div>

                        <div>
                                <label className="label p-2">
                                    <span className='text-base label-text'>Content</span>
                                </label>
                                <input type="text" placeholder='Enter content' className='input input-bordered h-10 w-full'
                                value={content} onChange={ (e)=>{setContent(e.target.value)} }/>
                        </div>
                        
                        <div>
                                <label className="label p-2">
                                    <span className='text-base label-text'>Image Url</span>
                                </label>
                                <input type="Password" placeholder='Enter image url' className='input input-bordered h-10 w-full'
                                value={imageUrl} onChange={ (e)=>{setImageUrl(e.target.value)} }/>
                        </div>
                        
                        <div className='flex justify-center items-center'>
                            <button className="btn glass w-1/2 btn-md mt-4 text-base">
                                Create Post
                            </button>
                        </div>
                </form>
        </div>
    )
}

export default CreatePost
