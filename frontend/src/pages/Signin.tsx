import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/signin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });
            const data = await response.json();
            
            if(data.error){
                alert(JSON.stringify(data.error))
            }
            if(data.message){
                alert(JSON.stringify(data.message));
                localStorage.setItem('role-type', data.role);
                
                // route the user to specific page as per authorization
                const rolePath = `/${data.role.toLowerCase()}`;
                navigate(rolePath.toString());
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>

            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30'>
            
                <h1 className='text-3xl font-semibold text-center text-white mb-5'>
                Login
                </h1>

                <form onSubmit={handleSubmit}>
                        <div>
                                <label className="label p-2">
                                    <span className='text-base label-text'>Email</span>
                                </label>
                                <input type="text" placeholder='Enter your email' className='input input-bordered h-10 w-full'
                                value={email} onChange={ (e) => {setEmail(e.target.value)} }/>
                        </div>

                        <div>
                                <label className="label p-2">
                                    <span className='text-base label-text'>Password</span>
                                </label>
                                <input type="Password" placeholder='Enter your password' className='input input-bordered h-10 w-full'
                                value={password} onChange={ (e)=>{setPassword(e.target.value)} }/>
                        </div>

                        <Link to='/signup' className='text-center text-sm hover:underline hover:text-blue-600 mt-2 block'>
                            Don't have an account?
                        </Link>
                        
                        <div className='flex justify-center items-center'>
                            <button className="btn glass w-1/2 btn-md mt-4 text-base">
                                Login
                            </button>
                        </div>
                </form>

            </div>
        
        </div>
    )
}

export default Signin