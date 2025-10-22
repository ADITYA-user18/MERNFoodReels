// axios.js
import axios from "axios";

// ✅ Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // 👉 Replace with your backend URL
  withCredentials: true, // if you're using cookies/auth tokens
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // If you store token in localStorage or cookies, attach it
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
