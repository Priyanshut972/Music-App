# Music Platform

A full-stack music streaming platform with user authentication, music playback, and playlist management.


https://github.com/user-attachments/assets/376d0dc7-7dde-46b1-ae7f-58eddee434d6


## Features

- 🎵 Music streaming from external APIs
- 🔐 User authentication (register/login/logout)
- 💾 Favorite tracks system
- 📝 Playlist creation and management
- 🎧 Audio player with playback controls
- 📱 Responsive design for all devices

## Technologies Used

### Frontend
- React 18
- React Router 6
- Material-UI (MUI) 5
- Axios for API calls
- React H5 Audio Player

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Installation

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory: cd backend

2. Install dependencies: npm install

3. Create a .env file:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/music-platform?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret_key

JAMENDO_CLIENT_ID=your_jamendo_client_id

PORT=5000

4. Start the server: node server.js

# Frontend Setup

1. Navigate to the frontend directory: cd frontend

2. Install dependencies: npm install

3. Start the development server: npm start

# Project Structure

![image](https://github.com/user-attachments/assets/806041d8-5b85-4aaa-ba8a-9625aa43dbb2)
