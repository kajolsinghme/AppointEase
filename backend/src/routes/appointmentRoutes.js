import express from "express";
import { bookAppointment } from "../controllers/appointmentController.js";
import { validateAuthenticationMiddleware } from "../middlewares/authMiddleware.js";
import { validateBookAppointmentMiddleware } from "../middlewares/appointmentMiddleware.js";

const router = express.Router();

router.post("/", validateAuthenticationMiddleware, validateBookAppointmentMiddleware, bookAppointment);
/*
router.get("/", validateAuthenticationMiddleware, getAppointments); 
router.patch("/:id/status", validateAuthenticationMiddleware, updateAppointmentStatus);
router.delete("/:id", validateAuthenticationMiddleware, cancelAppointment);
*/
export default router;
