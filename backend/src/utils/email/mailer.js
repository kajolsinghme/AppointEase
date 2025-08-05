import nodemailer from "nodemailer";
import {
  patientAppointmentTemplate,
  doctorAppointmentTemplate,
} from "./emailTemplates.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendAppointmentConfirmation = async (
  patientEmail,
  doctorEmail,
  appointmentDetails
) => {
  try {
    const mailOptionsForPatient = {
      from: process.env.EMAIL_USER,
      to: patientEmail,
      subject: "Appointment Confirmation",
      html: patientAppointmentTemplate(appointmentDetails),
    };

    const mailOptionsForDoctor = {
      from: process.env.EMAIL_USER,
      to: doctorEmail,
      subject: "New Appointment Scheduled",
      html: doctorAppointmentTemplate(appointmentDetails),
    };

    await transporter.sendMail(mailOptionsForPatient);
    await transporter.sendMail(mailOptionsForDoctor);

    console.log("Emails sent successfully to patient and doctor");
  } catch (error) {
    console.error("Error sending emails:", error);
    throw new Error("Failed to send confirmation emails");
  }
};
