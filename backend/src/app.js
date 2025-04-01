import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json())

// Define routes
app.use("/api/auth", authRoutes); 
app.use("/api/user", userRoutes);
app.use("/api/appointments", appointmentRoutes)

export default app;