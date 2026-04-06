# Job Application Tracker

A full-stack web application that helps users track and manage their job applications in one place.

## 🚀 Live Demo

* Frontend: https://job-application-tracker-1-z6yd.onrender.com/
* Backend API: https://job-application-tracker-hspy.onrender.com/

---

## 📌 Features

* User authentication (Register & Login with JWT)
* Create, edit, and delete job applications
* Track application status (Applied, Interview, Offer, etc.)
* Secure API with protected routes
* Persistent data storage using PostgreSQL (Supabase)
* Responsive modern UI built with React + Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* PostgreSQL (Supabase)
* JWT Authentication
* bcrypt for password hashing

### Deployment

* Render (Frontend + Backend)
* Supabase (Database)

---

## 📂 Project Structure

```
job-tracker/
│
├── client/        # Frontend (React + Vite)
│   ├── src/
│   └── ...
│
├── server/        # Backend (Node + Express)
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── ...
│
└── README.md
```

---

## 🧪 Running Locally

### 1. Clone the repo

```
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

### 2. Setup backend

```
cd server
npm install
npm run dev
```

### 3. Setup frontend

```
cd client
npm install
npm run dev
```

### 4. Open app

```
http://localhost:5173
```

---

## 🔐 API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Applications

* GET `/api/applications`
* POST `/api/applications`
* PUT `/api/applications/:id`
* DELETE `/api/applications/:id`

(All protected routes require JWT)

---

## 🌍 Deployment

### Backend (Render)

* Service type: Web Service
* Root directory: `server`
* Build command: `npm install`
* Start command: `npm start`

### Frontend (Render)

* Service type: Static Site
* Root directory: `client`
* Build command: `npm install && npm run build`
* Publish directory: `dist`

```

---

## 🧠 What I Learned

* Full-stack development with React and Express
* JWT authentication and protected routes
* Working with PostgreSQL and Supabase
* Environment variables and deployment workflows
* Debugging real-world issues (CORS, env variables, API routing)

---

## 📌 Future Improvements

* Add search and filters
* Add analytics dashboard (charts)
* Add job notes tagging system
* Email reminders for follow-ups
* Dark/light theme toggle

---

## 👨‍💻 Author

Felipe Villacrés

* GitHub: https://github.com/felipev1005
* LinkedIn: https://www.linkedin.com/in/felipe-villacr%C3%A9s-3b65982aa/

---

## ⭐️ Show your support

If you like this project, give it a ⭐ on GitHub!
