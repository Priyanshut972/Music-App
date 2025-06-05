# Music Platform

A full-stack music streaming platform with user authentication, music playback, and playlist management.



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

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
Install dependencies:

bash
npm install
Create a .env file:

env
MONGODB_URI=mongodb://localhost:27017/music-platform
JWT_SECRET=your_very_strong_secret_here
PORT=5000
Start the server:

bash
node server.js
Frontend Setup
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
