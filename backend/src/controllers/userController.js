import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      name,
      specialization,
      experience,
      clinicAddress,
      consultationFee,
      availability,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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

    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    return res.status(200).json({ success: true, message: "List of all doctors fetched successfully", data: doctors });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
