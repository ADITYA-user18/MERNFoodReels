import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission

    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/food-partner/login",
        {
          email: email.trim(),
          password: password
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log("Login response:", res.data);
      alert("Login successful!");
      navigate("/create-food"); // navigate to next page
    } catch (error) {
      console.error(
        "❌ Error logging in:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Server Side Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Food Partner Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="partnerEmail"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              id="partnerEmail"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="partnerPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="partnerPassword"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4 space-y-2">
            <Link
              to="/food-partner/register"
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
            >
              Need to register as a partner? Sign up
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

export default FoodPartnerLogin;
