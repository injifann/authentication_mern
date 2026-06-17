# MERN Stack Authentication System

A fully functional User Authentication system built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). This application implements secure user registration, login, and token-based session management, allowing authenticated users to access a protected dashboard displaying their personal account details.

---

## 📸 Application Screenshots

### 1. Register Page
![Register Page](screenshots//Register.png)

### 2. Login Page
![Login Page](screenshots//Login.png)

### 3. User Dashboard (Name and Email)
![User Dashboard](screenshots//Dashboard.png)

---

## 🚀 Features

- **User Registration**: Secure account creation with password hashing.
- **User Login**: Identity verification via secure credentials matching.
- **JWT Authentication**: JSON Web Tokens used for secure, stateless state tracking and endpoint authorization.
- **Protected Dashboard Route**: A restricted view layer that decodes and displays the authenticated user's name and email address.
- **Security Best Practices**: Utilizes `bcryptjs` for cryptographic password salts and hashes, alongside protected API routers.

---

## 🛠️ Tech Stack & Dependencies

### Backend
- **Node.js & Express.js**: Application server framework.
- **MongoDB & Mongoose**: Database and Object Data Modeling (ODM).
- **jsonwebtoken (JWT)**: Authentication tokens transmission.
- **bcryptjs**: Password hashing functions.
- **cors & dotenv**: Cross-Origin Resource Sharing handling and environment variable management.

### Frontend
- **React.js**: User interface generation.
- **React Router**: Client-side page navigation.
- **Axios**: Promise-based HTTP requests to API endpoints.
- **Tailwind css**: styling UI

---
### Setup the Backend Environment
   cd backend
   npm install express mongoose bcryptjs jsonwebtoken cors dotenv
   create .env file in root folder
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    npm run dev

### Setup the Frontend Environment
      cd frontend
      npm install react-router-dom axios 
      npm install -D tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      npm run dev

## 📁 Project Architecture

```text
mern-auth-app/
├── backend/
│   ├── config/          # Database connection configuration
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # Express API route handlers
│   ├── .env             # Server environment variables (gitignored)
│   └── server.js        # Server entry point
└── frontend/
    ├── src/
    │   ├── pages/       # Login, Register, and Homepage views
    │   ├── App.js       # React root routing configuration
    │   └── index.js     # React application mounting point


