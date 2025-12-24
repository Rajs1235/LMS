# LMS – 1Fi Loan Management System

1Fi LMS is a backend-driven Loan Management System designed for NBFCs and fintech partners.  
It enables secure loan applications backed by collateral, structured admin workflows, and automated email notifications on loan status updates.

---

## 🚀 Key Features

### 👤 Applicant / Fintech Partner
- View available loan products
- Apply for loans using collateral
- Automatic LTV (Loan-to-Value) eligibility validation
- Secure loan application submission

### 🏦 Admin / NBFC
- Create and manage loan products
- View all loan applications
- Update loan status:
  - Pending
  - Approved
  - Rejected
  - Hold
  - Ongoing
  - Completed
- Automated email notifications on every status change
- Safe handling of legacy records without email

### ✉️ Email Automation
- Email sent automatically when loan status is updated
- Gmail SMTP (Port 587)
- Fail-safe checks to prevent invalid email sends

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Nodemailer
- JWT Authentication

### Frontend (separate repo)
- React.js
- Tailwind CSS
- Axios

---
## 📂 Backend Project Structure

## backend/
├── Controllers/
│ └── loan.controller.js
├── Models/
│ ├── Application.model.js
│ └── Product.model.js
├── Routes/
│ ├── loan.routes.js
│ └── admin.routes.js
├── middleware/
│ └── Auth.middleware.js
├── server.js
└── package.json

Create a `.env` file in the backend root:

## env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_gmail_app_password

##📡 API Endpoints
Public

GET /loan/product → Get all loan products

POST /loan/apply → Submit a loan application

Admin (Protected)

POST /admin/login → Admin login

GET /loan/list → View all applications

PATCH /loan/update-status/:id → Update loan status

POST /loan/product → Create loan product

📬 Email Notification Logic

Emails are sent only when the admin updates the loan status.

Triggered by:

PATCH /loan/update-status/:id


Email is sent for:

Approved

Rejected

Hold

Ongoing

Completed

🧪 Validation & Safety

LTV validation before loan creation

Email presence validation

SMTP verification before sending

Safe guards for legacy data
