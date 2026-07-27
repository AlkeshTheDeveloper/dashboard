# 🚀 MERN Dashboard

A production-style MERN Stack application built with clean architecture and modern development practices.

> This project is being developed step-by-step following industry standards instead of a tutorial-style implementation.

---

# 📌 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Redux Persist
- Axios
- React Hook Form

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- express-validator

---

# ✨ Features

## Authentication

- ✅ User Registration
- ✅ User Login
- ✅ Password Hashing
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Axios Interceptor
- ✅ Redux Authentication
- ✅ Persist Login
- ✅ Logout
- ✅ Input Validation

---

## Architecture

### Backend

```
server/
│
├── src/
│
├── config/
│   └── db.js
│
├── constants/
│
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── modules/
│   └── auth/
│       ├── auth.controller.js
│       ├── auth.model.js
│       ├── auth.routes.js
│       ├── auth.service.js
│       ├── auth.validation.js
│       └── auth.constants.js
│
├── routes/
│   └── index.js
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── jwt.js
│
├── app.js
└── server.js
```

---

### Frontend

```
client/
│
├── src/
│
├── api/
│   └── axios.js
│
├── app/
│   ├── store.js
│   └── storage.js
│
├── components/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── features/
│   └── auth/
│       ├── authApi.js
│       ├── authSlice.js
│       └── authSelectors.js
│
├── pages/
│   ├── Login/
│   └── Dashboard/
│
├── routes/
│
├── App.jsx
└── main.jsx
```

---

# Authentication Flow

```
Login
      │
      ▼
React Hook Form
      │
      ▼
Axios
      │
      ▼
Express API
      │
      ▼
MongoDB
      │
      ▼
JWT Generated
      │
      ▼
Redux Store
      │
      ▼
Redux Persist
      │
      ▼
Axios Interceptor
      │
      ▼
Protected APIs
```

---

# API Endpoints

## Auth

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

### Current User

```
GET /api/auth/me
```

Requires:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/mern-dashboard.git
```

```
cd mern-dashboard
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Install Frontend

```bash
cd ../client
npm install
```

---

# Environment Variables

Create

```
server/.env
```

```
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

JWT_EXPIRES_IN=7d
```

---

# Run Backend

```
cd server
npm run dev
```

---

# Run Frontend

```
cd client
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# Current Progress

## Module 1

- [x] Express Setup
- [x] MongoDB Atlas
- [x] Mongoose
- [x] User Model
- [x] Register API
- [x] Login API
- [x] JWT Authentication
- [x] Password Hashing
- [x] Validation
- [x] Error Handling

---

## Module 2

- [x] React Setup
- [x] Redux Toolkit
- [x] Redux Persist
- [x] Axios
- [x] Axios Interceptors
- [x] React Hook Form
- [x] Protected Routes
- [x] Public Routes

---

## Upcoming Modules

- [ ] Expense Management
- [ ] Transactions
- [ ] Dashboard Analytics
- [ ] Charts
- [ ] Search
- [ ] Pagination
- [ ] User Profile
- [ ] Role Based Authorization
- [ ] Unit Testing
- [ ] Docker
- [ ] CI/CD
- [ ] Deployment

---

# Project Goals

This project is focused on learning and implementing:

- Clean Architecture
- Feature-based Folder Structure
- Scalable MERN Development
- Authentication Best Practices
- Redux State Management
- REST API Design
- Secure JWT Authentication
- Production-ready Code Organization

---

# Author

**Alkesh Sakre**

GitHub:
https://github.com/alkeshTheDeveloper

LinkedIn:
https://www.linkedin.com/in/alkesh-kumar-sakre/
---

# License

This project is licensed under the MIT License.