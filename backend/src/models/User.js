import mongoose from "mongoose";
import { USER_TYPE } from "../constants/enums.js";

const doctorDetailsSchema = new mongoose.Schema(
  {
    specialization: {
      type: String,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
    },
    mobile: {
      type: String
    },
    clinicAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    consultationFee: {
      type: Number,
      min: 0,
    },
    availability: [
      {
        day: String, // "Monday"
        startTime: String, // "09:00 AM"
        endTime: String, // "05:00 PM"
      },
    ],
    illnesses: [
      {
        type: String,
      },
    ],
  },
  {timestamps: true}
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [USER_TYPE.DOCTOR, USER_TYPE.PATIENT],
      required: true,
    },
    profileImage: {
      type: String,
    },
    doctorDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorDetails"
    },
  },
  { timestamps: true }
);

export const DoctorDetails  = mongoose.model("DoctorDetails", doctorDetailsSchema)

export const User = mongoose.model("User", userSchema);


