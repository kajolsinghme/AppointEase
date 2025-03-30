import User from "../models/User.js";

export const updateProfile = async(req,res) => {
    try{
        const userId = req.user.id

        const { name, specialization, experience, clinicAddress, consultationFee, availability } = req.body;

        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // Update basic fields 
        if (name) user.name = name;

        // If user is a doctor, update doctor-specific fields
        if (user.role === "doctor") {
            if (specialization) user.doctorDetails.specialization = specialization;
            if (experience) user.doctorDetails.experience = experience;
            if (clinicAddress) user.doctorDetails.clinicAddress = clinicAddress;
            if (consultationFee) user.doctorDetails.consultationFee = consultationFee;
            if (availability) user.doctorDetails.availability = availability;
        }

        await user.save();
        
        return res.status(200).json({ success: true, message: "Profile updated successfully" });
    }
    catch(error){
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}