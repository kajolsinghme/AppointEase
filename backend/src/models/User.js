import mongoose from "mongoose";

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
      enum: ["patient", "doctor"],
      required: true,
    },
    doctorDetails: {
      specialization: {
        type: String,
      },
      yearsOfExperience: {
        type: Number,
        min: 0,
      },
      clinicAddress: {
        type: String,
      },
      consultationFee: {
        type: Number,
        min: 0,
      },
      availability: [
        {
          day: String, //"Monday"
          startTime: String, // "09:00 AM"
          endTime: String, // "05:00 PM"
        },
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
