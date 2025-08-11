import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get("/status", (req, res) => {
  res.status(200).send("Backend running successfully");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api", uploadRoutes);

export default app;
