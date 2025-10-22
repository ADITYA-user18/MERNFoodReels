🍔 Food Partner Video Showcase (MERN Stack)
📌 Overview

This project is a full-stack MERN application where food partners can register and upload promotional videos for their food products.
Users can scroll through full-screen vertical videos (similar to Instagram Reels or TikTok), and each video has a short description and a Visit Store button that redirects users to that partner’s page or store.

🚀 Features
👨‍🍳 Food Partner (Backend)

Partner registration and login using JWT Authentication

Secure password hashing with bcrypt

Data stored in MongoDB

Token stored in cookies for session persistence

🍿 User Interface (Frontend)

Infinite vertical scrolling video feed

Each video autoplays when visible using Intersection Observer API

Overlay description with blur background

“Visit Store” button redirects to partner’s detailed page

Smooth snap scrolling and responsive UI built with TailwindCSS

🌐 API

/api/food/ → Fetches all video data

/api/user/register → Registers a new user

/api/user/login → Logs in existing user

/api/food/add → Adds a new video with metadata (partner, desc, video URL)

🧩 Tech Stack
Layer	Technology
Frontend	React.js, TailwindCSS, Axios, React Router
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ORM)
Auth	JWT + Cookies
Other Tools	dotenv, nodemon, bcryptjs
📁 Project Structure
project/
│
├── backend/
│   ├── server.js
│   ├── .env
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── foodRoutes.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── foodController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Food.js
│   └── middleware/
│       └── authMiddleware.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Home.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   ├── config/
│   │   │   └── axios.js
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/foodpartner-video-app.git
cd foodpartner-video-app

2️⃣ Setup Backend
cd backend
npm install


Create .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173


Run the server:

npm start

3️⃣ Setup Frontend
cd ../frontend
npm install


Create .env file:

VITE_API_URL=http://localhost:3000


Run the React app:

npm run dev

📦 API Example (GET /api/food/)

Response Example:

[
  {
    "_id": "6733abc239ad",
    "video": "https://ik.imagekit.io/sample/video.mp4",
    "desc": "Tasty burgers from our chef!",
    "foodPartner": "672fbce819f"
  }
]

🎬 UI Demo (Preview)

Vertical scrolling full-screen videos

Auto-play when visible, auto-pause when scrolled away

Each video contains:

Description overlay

"Visit Store" button linking to /food-partner/:id

🔐 Authentication Flow

Partner registers via /api/user/register → JWT created → Stored in browser cookie

On subsequent visits, the token is verified → Partner stays logged in

Protected routes use middleware to verify token and access partner data


