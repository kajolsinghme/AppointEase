import { APPOINTMENT_STATUS } from "../constants/enums.js";
import Appointment from "../models/Appointment.js";
import { User } from "../models/User.js";
import { sendAppointmentConfirmation } from "../utils/email/mailer.js";
import {createZoomMeeting} from "../utils/zoom/zoomService.js"
import dotenv from "dotenv";

dotenv.config();

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctorId, scheduledAt, type } = req.body;

    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || doctor.role !== "Doctor") {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      scheduledAt,
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "Doctor is already booked for this time slot",
      });
    }

    let zoomLink = null;

    if (type === "Video Consultation") {
      zoomLink = await createZoomMeeting(process.env.EMAIL_USER, "Appointment with Patient", scheduledAt)
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      scheduledAt,
      type,
      zoomLink
    });

    await appointment.save();
    console.log("type",type)

    // Appointment details for email
    const appointmentDetails = {
      patientName: patient.name,
      doctorName: doctor.name,
      scheduledAt: new Date(scheduledAt).toLocaleString(),
      type,
      location: (type === "In Person" && doctor.doctorDetails.clinicAddress)
        ? doctor.doctorDetails.clinicAddress
        : null,
      zoomLink
    };

    console.log(appointmentDetails.location)
    // Send confirmation emails to both the patient and the doctor
    await sendAppointmentConfirmation(
      patient.email,
      doctor.email,
      appointmentDetails
    );

   

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully, confirmation emails sent",
      data: { id: appointment._id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { rescheduledAt } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (req.user.id !== appointment.patientId.toLocaleString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to reschedule this appointment",
      });
    }

    if(appointment.status !== APPOINTMENT_STATUS.BOOKED){
      return res.status(400).json({
        success: false,
        message: "Cannot reschedule an appointment that is already completed or cancelled",
      });
    }

    const isSlotTaken = await Appointment.findOne({
      doctorId: appointment.doctorId,
      scheduledAt: rescheduledAt,
    });
    if (isSlotTaken) {
      return res.status(400).json({
        success: false,
        message: "Selected time slot is already booked",
      });
    }

    appointment.scheduledAt = rescheduledAt;

    await appointment.save();

    return res
      .status(200)
      .json({ success: true, message: "Appointment rescheduled successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (req.user.id !== appointment.patientId.toLocaleString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to cancel this appointment",
      });
    }

    if(appointment.status !== APPOINTMENT_STATUS.BOOKED){
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an appointment that is already completed or cancelled",
      });
    }
    appointment.status = "cancelled";

    await appointment.save();

    return res
      .status(200)
      .json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
