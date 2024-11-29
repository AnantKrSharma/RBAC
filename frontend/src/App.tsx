import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import User from "./pages/User"
import Moderator from "./pages/Moderator"
import Admin from "./pages/Admin"
import { useAuthContext } from "./context/AuthContext"

function App() {
  // @ts-expect-error: authUser type can't be set
  const { authUser, setAuthUser } = useAuthContext();
  const rolePath = authUser ? `/${authUser.toLowerCase()}` : "/signin";
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("role-type");
    setAuthUser(null); // Clear the role from context and local-storage

    const response = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    });
    const data = await response.json();
    
    if(data.message){
      alert(data.message);
      navigate('/signin')
    }
  }

  return <div className="min-h-screen overflow-auto">
      {authUser &&
        <div className="border flex items-center justify-between p-2">
          <span className="bg-gray-900 p-2 text-white">
            RBAC Blog-App
          </span>
          <button onClick={handleLogout}
                  className="p-2 rounded-lg bg-red-600 text-white"
          >
            Log-Out
          </button>
        </div>
      }
      
      {JSON.stringify(authUser)}

      <div className="flex items-center justify-center h-full">
          
        <Routes>
            <Route path="/" element={authUser ? <Navigate to={rolePath} /> : <Signup />} />

            <Route path="/signup" element={authUser ? <Navigate to={rolePath} /> : <Signup />} />

            <Route path="/signin" element={authUser ? <Navigate to={rolePath} /> : <Signin />} />

            <Route path="/user" element={authUser === "User" ? <User /> : <Navigate to={rolePath} />} />

            <Route path="/moderator" element={authUser === "Moderator" ? <Moderator /> : <Navigate to={rolePath} />} />

            <Route path="/admin" element={authUser === "Admin" ? <Admin /> : <Navigate to={rolePath} />} />
        </Routes>
      </div>
  </div>
}

export default App
