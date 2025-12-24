# 🚀 1Fi LMS – Loan Management System

A full-stack **Loan Management System (LMS)** built as part of the **1Fi SDE Assignment**.  
The project demonstrates backend API design, admin authentication, protected routes, and a modern React frontend.

---

## 🧩 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🧭 React Router
- 🔗 Axios
- 🎨 Tailwind CSS / UI components

### Backend
- 🟢 Node.js
- 🚏 Express.js
- 🍃 MongoDB (Mongoose)
- 🔐 JWT Authentication
- 📧 Resend Email API (optional)

### Deployment
- **Backend:** Render  
- **Frontend:** Vercel / Netlify

---

## ✨ Features

### Public
- 📦 View available loan products
- 📝 Submit loan applications with collateral details

### Admin (Protected)
- 🔐 Admin login & registration
- 📋 View all loan applications
- 🔄 Update loan status (Pending / Approved / Rejected)
- ➕ Add new loan products
- 📧 Email notification on status update (demo-ready)

---

## 📁 Project Structure

```
Backend/
 ├── app.js
 ├── index.js
 ├── package.json
 ├── Routes/
 ├── Controllers/
 ├── Models/
 ├── middleware/
 └── .env

Frontend/
 ├── package.json
 ├── vite.config.js
 └── src/
     ├── main.jsx
     ├── App.jsx
     ├── services/
     │   └── api.js
     ├── pages/
     └── components/
         └── ui/
```

---

## 🔐 Environment Variables

### Backend (`Backend/.env`)
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/1fi_lms
PORT=4000
JWT_SECRET=your_secure_jwt_secret
RESEND_API_KEY=rs_xxxxxxxxxxxx   # optional
```

### Frontend (`.env`)
```env
VITE_API_URL=https://lms-backend-thkb.onrender.com/api/v1
```

---

## ⚙️ Local Setup

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## 🔌 API Reference

**Base URL**
```
https://lms-backend-thkb.onrender.com/api/v1
```

---

## 🧪 Testing

- APIs tested using **Postman**
- Frontend tested via browser flows
- Backend logs monitored via **Render dashboard**

---

## ⚠️ Notes

- Email functionality uses **Resend (testing mode)**
- Secrets are excluded using `.env` and `.gitignore`
- Focus is on **clean architecture and correctness**

---

## 👨‍💻 Author

**Raj Srivastava**  
SDE Assignment – 1Fi
