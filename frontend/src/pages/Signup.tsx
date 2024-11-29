import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface SignupInput{
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

function Signup() {
    const [input, setInput] = useState<SignupInput>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();
    
    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
                credentials: "include"
            })
            const data = await response.json();
            
            if(data.error){
                alert(JSON.stringify(data.error))
            }
            if(data.message){
                alert(JSON.stringify(data.message));
                localStorage.setItem('role-type', data.role);
                
                // route the user to specific page as per authorization
                const rolePath = `/${data.role.toLowerCase()}`;
                navigate(rolePath);
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30'>
        
            <h1 className='text-3xl font-semibold text-center text-white mb-5'>
                SignUp 
            </h1>

            <form onSubmit={handleSubmit}>
                    <div>
                            <label className="label p-2">
                                <span className='text-base label-text'>Name</span>
                            </label>
                            <input type="text" placeholder='Enter your name' className='input input-bordered h-10 w-full'
                                    value={input.name} 
                                    onChange={(e)=>{
                                        setInput({...input, name:e.target.value})
                                    }}
                            />
                    </div>

                    <div>
                            <label className="label p-2">
                                <span className='text-base label-text'>Email</span>
                            </label>
                            <input type="text" placeholder='Enter your email' className='input input-bordered h-10 w-full'
                                    value={input.email}
                                    onChange={(e)=>{
                                        setInput({...input, email: e.target.value})
                                    }}
                            />
                    </div>

                    <div>
                            <label className="label p-2">
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input type="password" placeholder='Enter a strong password' className='input input-bordered h-10 w-full'
                                    value={input.password}
                                    onChange={(e)=>{
                                        setInput({...input, password: e.target.value})
                                    }}
                            />
                    </div>
                    
                    <div>
                            <label className="label p-2">
                                <span className='text-base label-text'>Confirm Password</span>
                            </label>
                            <input type="password" placeholder='Confirm Password' className='input input-bordered h-10 w-full'
                                    value={input.confirmPassword}
                                    onChange={(e)=>{
                                        setInput({...input, confirmPassword: e.target.value})
                                    }}
                            />
                    </div>

                    <Link to='/signin' className='text-center text-sm hover:underline hover:text-blue-600 mt-2 block'>
                        Already have an account?
                    </Link>
                    
                    <div className='flex justify-center items-center'>
                        <button className="btn btn-wide glass btn-xs sm:btn-sm md:btn-md mt-4">
                            Sign Up
                        </button>
                    </div>
            </form>

        </div>
    
    </div>
    )
}

export default Signup
