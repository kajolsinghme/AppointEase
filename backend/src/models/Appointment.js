import mongoose from "mongoose";
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE } from "../constants/enums";

const appointmentSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledAt: { 
        type: Date, 
        required: true 
    },
    type: {
      type: String,
      enum: [APPOINTMENT_TYPE.IN_PERSON, APPOINTMENT_TYPE.VIDEO_CONSULTATION],
      required: true,
    },
    status: {
      type: String,
      enum: [APPOINTMENT_STATUS.BOOKED, APPOINTMENT_STATUS.CANCELLED],
      default: APPOINTMENT_STATUS.BOOKED,
    },
    zoomLink: { 
      type: String, 
      default: null 
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
