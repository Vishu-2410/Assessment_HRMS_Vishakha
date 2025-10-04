# HRMS Assessment Project

## Overview
This is the **HRMS (Human Resource Management System) Assessment Project** built for evaluation purposes.  
It is a simple HR management system where HR can add and manage employees, approve requests, and employees can view their details and submit requests.

The project includes:

- **Frontend**: Built with **React.js**, includes pages for login, adding employees, managing employees, approvals, employee dashboard, and request submission.
- **Backend**: Built with **Node.js, Express, and MongoDB** (to be created), handles API endpoints for authentication, employee management, requests, and approvals.
- **MobileApp**: Placeholder folder for future mobile app development.

---

## Project Structure

Assessment_HRMS_Vishakha/
├── Frontend/ # React frontend project
│ ├── public
│ ├── src/ # React components, pages, API services, context, CSS
│ └── package.json
├── Backend/ # Node.js + Express + MongoDB backend 
├── MobileApp/ # Placeholder folder for future mobile app
└── README.md


---

## Frontend Features

- **Login Page**: Authenticate HR or Employee.
- **Add Employee Page**: HR can add a new employee with auto-generated employee code and password.
- **Manage Employee Page**: HR can view, update, and delete employees.
- **Approval Page**: HR can view requests submitted by employees and approve/disapprove them.
- **Employee Dashboard**: Displays employee profile information and welcome message.
- **Employee Request Page**: Employees can submit requests and view their status.

---

## Backend Features (Planned)

- **Authentication**: Login API for HR and Employees.
- **Employee Management**: CRUD operations for employees.
- **Requests Management**: Employees can create requests; HR can approve/disapprove.
- **Database**: MongoDB using Mongoose models for Employees and Requests.

---

## Technologies Used

- **Frontend**: React.js, React Router, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, bcryptjs (for password hashing)
- **Version Control**: Git / GitHub

---

## Setup Instructions

### Frontend

1. Navigate to the `Frontend` folder:
   cd Frontend
   npm start

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Access the app in your browser at http://localhost:3000

### Backend 

1. Navigate to the Backend folder:
   cd Backend

2. Install dependencies:
   npm install

3. Set up environment variables (.env):
  PORT=5000
  MONGO_URI=<Your MongoDB connection string>
  JWT_SECRET=<Your JWT secret>

4. Start the backend server:
   node server.js

5. Backend APIs will be accessible at http://localhost:5000/api/