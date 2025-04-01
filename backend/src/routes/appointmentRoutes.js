import express from "express";
import { bookAppointment, rescheduleAppointment, cancelAppointment} from "../controllers/appointmentController.js";
import { validateAuthenticationMiddleware } from "../middlewares/authMiddleware.js";
import { validateBookAppointmentMiddleware, validateRescheduleAppointmentMiddleware } from "../middlewares/appointmentMiddleware.js";

const router = express.Router();

// Book an appointment
router.post("/", validateAuthenticationMiddleware, validateBookAppointmentMiddleware, bookAppointment);

// Reschedule an appointment
router.patch("/:appointmentId/reschedule", validateAuthenticationMiddleware, validateRescheduleAppointmentMiddleware, rescheduleAppointment);

// Cancel an appointment
router.delete("/:appointmentId", validateAuthenticationMiddleware, cancelAppointment);

/*
router.get("/", validateAuthenticationMiddleware, getAppointments); 
*/
export default router;
