import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { sendAppointmentConfirmation } from "../utils/mailer.js";

export const bookAppointment = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctorId, scheduledAt, type } = req.body;

    const doctor = await User.findById(doctorId);
    const patient = await User.findById(patientId);

    if (!doctor || doctor.role !== "doctor") {
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

    const appointment = new Appointment({
      patientId,
      doctorId,
      scheduledAt,
      type,
      status: "booked",
    });

    await appointment.save();

    console.log(doctor.doctorDetails)

    // Appointment details for email
    const appointmentDetails = {
      patientName: patient.name,
      doctorName: doctor.name,
      scheduledAt: new Date(scheduledAt).toLocaleString(),
      location: doctor.doctorDetails ? doctor.doctorDetails.clinicAddress : "Not Available",
      type
    }

    // Send confirmation emails to both the patient and the doctor
    await sendAppointmentConfirmation(patient.email, doctor.email, appointmentDetails)

    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully, confirmation emails sent",
      data: {id: appointment._id},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

