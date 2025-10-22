import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate();


async function SubmitHandler(e) {
  e.preventDefault(); 

  try {
    const res = await axios.post(
      "http://localhost:3000/api/user/register", 
      { 
        name: Name,
        email: Email,
        password: Password,
      },
      { 
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate('/home')
    console.log("✅ Data sent successfully:", res.data);
    alert("Registration successful!");
  } catch (error) {
    console.error("❌ Error while sending data:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Server Side Error" );
  }
}




    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create your User Account</h2>
            <form onSubmit={SubmitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        name='name'
                        placeholder="Enter your name"
                        value={Name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name='email'
                        type="email"
                        placeholder="Enter your email"
                        value={Email}
                        onChange={(e)=>setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name='password'
                        placeholder="******************"
                        value={Password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        type="submit"
                        
                    >
                        Register
                    </button>
                </div>
                <div className="text-center mt-4 space-y-2">
                    <Link to="/userLogin" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Already have an account? Login
                    </Link>
                    <div>
                        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};

export default UserRegister;