# AppointEase

**AppointEase** is a full-stack web application that simplifies doctor-patient appointment scheduling.  
Patients can easily find and book doctors based on specialization and availability, while doctors can manage their schedules effortlessly.  
The platform also supports **Zoom consultations**, email notifications, and real-time updates.

---

## 🚀 Features

**User Authentication** – Patients & doctors can register and log in. 
**Doctor Profiles** – Display specialization and availability. 
**Availability Management** – Doctors can set and update their working hours and time slots.
**Appointment Booking** – Patients can select a doctor, date, and time. 
**Rescheduling & Cancellation** – Patients can modify or cancel bookings. 
**Email Notifications** – Confirmation, rescheduling, and reminders via **Nodemailer**. 
**Doctor Dashboard** – Doctors can view upcoming appointments & manage availability.  
**Zoom Integration** – Patients and doctors can have **Zoom video consultations**. 

---

## 🛠 Tech Stack

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

---

## 📂 Project Structure

```

AppointEase/
│
├── backend/         # Server-side APIs, DB models, authentication, integrations
├── frontend/        # Client-side UI, components, pages, and services
├── README.md        # Project documentation

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

### 3️⃣ Setup environment variables

In the **backend** `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
ZOOM_ACCOUNT_ID=your_zoom_account_id
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Run the application

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Frontend will run at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 🌐 Live Demo

[**AppointEase Live**](https://appoint-ease-kappa.vercel.app)

---

## 📧 Contact

**Author:** Kajol Singh
**GitHub:** [kajolsinghme](https://github.com/kajolsinghme)

```

---

