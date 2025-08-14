# AppointEase

**AppointEase** is a full-stack web application that simplifies doctor-patient appointment scheduling.  
Patients can easily find and book doctors based on specialization and availability, while doctors can manage their schedules effortlessly.  
The platform also supports **Zoom consultations**, email notifications, and real-time updates.

## Features

1. **User Authentication** – Patients & doctors can register and log in.
2. **Doctor Profiles** – Display specialization and availability.
3. **Availability Management** – Doctors can set and update their working hours and time slots.
4. **Appointment Booking** – Patients can select a doctor, date, and time.
5. **Rescheduling & Cancellation** – Patients can modify or cancel bookings.
6. **Email Notifications** – Confirmation, rescheduling, and reminders via **Nodemailer**.
7. **Doctor Dashboard** – Doctors can view upcoming appointments & manage availability.
8. **Zoom Integration** – Patients and doctors can have **Zoom video consultations**.


## Tech Stack

**Frontend**
- React.js
- HTML5, CSS3, JavaScript
- Axios (API calls)

**Backend**
- Node.js with Express.js
- MongoDB & Mongoose
- JWT for authentication
- Nodemailer for emails
- Zoom API integration

**Hosting**
- Frontend: Vercel
- Backend: Heroku


## 📂 Project Structure

```

AppointEase/
│
├── backend/         # Server-side APIs, DB models, authentication, integrations
├── frontend/        # Client-side UI, components, pages, and services
├── README.md        # Project documentation
└── package.json     # Root package config (if applicable)

````

---

## 🔄 System Workflow

```mermaid
flowchart TD
    A[Patient Registers/Logs In] --> B[Search Doctors by Specialization]
    B --> C[View Doctor Profile & Availability]
    C --> D[Book Appointment]
    D --> E[Email Confirmation Sent via Nodemailer]
    E --> F[Zoom Meeting Link Generated]
    F --> G[Patient Joins Zoom Consultation]
    D --> H[Doctor Dashboard Updated]
    H --> I[Doctor Manages Availability]
````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kajolsinghme/AppointEase.git
cd AppointEase
```

### 2️⃣ Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### Setup environment variables

In the **backend** `.env` file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret

### Run the application

#### Backend:

cd backend
npm run dev

#### Frontend:

cd frontend
npm start

Frontend will run at `http://localhost:3000` and backend at `http://localhost:5000`.

---

## 🌐 Live Demo

[**AppointEase Live**](https://appoint-ease-kappa.vercel.app)

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/your-feature-name`)
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

## 📧 Contact

**Author:** Kajol Singh
GitHub: [kajolsinghme](https://github.com/kajolsinghme)
