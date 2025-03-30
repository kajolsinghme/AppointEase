import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["patient", "doctor"],
            required: true
        },
        doctorDetails: {
            specialization: {
                type: String
            },
            availability: [
                {
                    day: String,  //"Monday"
                    slots: [String]  //["10:00 AM", "11:00 AM"]
                }
            ]
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User;