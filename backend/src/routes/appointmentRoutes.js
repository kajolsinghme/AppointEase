import express from "express";
import { bookAppointment, rescheduleAppointment, cancelAppointment} from "../controllers/appointmentController.js";
import { authorisedRolesMiddleware, validateAuthenticationMiddleware } from "../middlewares/authMiddleware.js";
import { validateBookAppointmentMiddleware, validateRescheduleAppointmentMiddleware } from "../middlewares/appointmentMiddleware.js";
import { USER_TYPE} from "../constants/enums.js"
const router = express.Router();

// Book an appointment
router.post("/", validateAuthenticationMiddleware, authorisedRolesMiddleware([USER_TYPE.PATIENT]), validateBookAppointmentMiddleware, bookAppointment);

// Reschedule an appointment
router.patch("/:appointmentId/reschedule", validateAuthenticationMiddleware, authorisedRolesMiddleware([USER_TYPE.PATIENT, USER_TYPE.DOCTOR]), validateRescheduleAppointmentMiddleware, rescheduleAppointment);

// Cancel an appointment
router.delete("/:appointmentId", validateAuthenticationMiddleware, authorisedRolesMiddleware([USER_TYPE.PATIENT, USER_TYPE.DOCTOR]), cancelAppointment);

/*
router.get("/", validateAuthenticationMiddleware, getAppointments); 
*/
export default router;
