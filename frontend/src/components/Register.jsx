import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [userType, setUserType] = useState(null);
  const [Color, setColor] = useState("black");
  const [TextColor, setTextColor] = useState("Enable LightMode");
  const navigate = useNavigate(); // ✅ Correct hook

  function ColorHandler() {
    setColor(Color === "black" ? "white" : "black");
    setTextColor(Color === "black" ? "Enable DarkMode" : "Enable LightMode");
  }

  // Navigate when userType changes
  useEffect(() => {
    if (userType) {
      navigate(userType === "user" ? "/UserRegister" : "/food-partner/register");
    }
  }, [userType, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center gap-2 relative"
      style={{ backgroundColor: Color }}
    >
      <div className="absolute top-4 right-4 flex items-center space-x-2 p-3 bg-white rounded-lg shadow-md w-fit">
        <span className="text-gray-700 font-medium select-none">☀️ {TextColor}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            value={Color}
            onChange={ColorHandler}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-yellow-400 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-6 transition-transform"></div>
        </label>
      </div>

      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        {!userType && (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Choose your account type
            </h2>
            <div className="flex justify-around">
              <button
                onClick={() => setUserType("user")}
                className="w-full mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                User
              </button>
              <button
                onClick={() => setUserType("foodPartner")}
                className="w-full ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Food Partner
              </button>
            </div>
            <div className="text-center mt-6 space-y-2">
              <p className="text-gray-600">Already have an account?</p>
              <div className="flex justify-center space-x-4">
                <Link to="/userLogin" className="text-blue-500 hover:text-blue-800 font-medium">
                  User Login
                </Link>
                <span className="text-gray-400">|</span>
                <Link to="/food-partner/login" className="text-green-500 hover:text-green-800 font-medium">
                  Partner Login
                </Link>
              </div>
            </div>
          </div>
        )}
        {userType && (
          <button
            onClick={() => setUserType(null)}
            className="text-sm text-gray-600 hover:text-gray-800 mb-4"
          >
            &larr; Back to account selection
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
