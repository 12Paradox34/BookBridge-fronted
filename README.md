
# BookBridge

India's hyperlocal marketplace for student textbooks and exam preparation materials.

## 1. Project Overview
**Pitch:** BookBridge connects students in the same city to buy and sell used textbooks directly. By focusing on Indian exam curriculums (JEE, NEET, UPSC), we cut the middleman, ensuring sellers recover costs and buyers get affordable study material instantly.
**Tagline:** "Pass on your Knowledge. Recover your Cost."

## 2. Architecture (MERN Stack)
This project is split into a **Frontend Client** and a **Backend Server**.

### Frontend
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS (Dark Mode enabled)
- **AI:** Google Gemini API integration for "Librarian" Chatbot.

### Backend (New!)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JSON Web Tokens (JWT) + BCrypt
- **Images:** Local storage via Multer (Production: Switch to S3/Cloudinary)

## 3. Setup Instructions

### Prerequisites
1. Node.js installed.
2. MongoDB installed locally or a MongoDB Atlas URI.

### Step 1: Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: 
   `npm install express mongoose cors dotenv multer jsonwebtoken bcryptjs`
3. Create a `.env` file in `backend/`:
   ```
   MONGO_URI=mongodb://localhost:27017/bookbridge
   JWT_SECRET=mysecretkey123
   PORT=5000
   ```
4. Start the server: `node server.js`

### Step 2: Frontend Setup
1. Navigate to root.
2. Ensure dependencies are installed.
3. Start React app.
4. The app will connect to `http://localhost:5000/api` by default.

## 4. API Endpoints

- **POST** `/api/auth/signup` - Register user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/listings` - Get all books (supports search query params)
- **POST** `/api/listings/new` - Create listing (Requires Auth)
- **POST** `/api/listings/images` - Upload images (Requires Auth)

## 5. Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Heroku / Render / AWS EC2
- **Database:** MongoDB Atlas
# BookBridge-fronted
