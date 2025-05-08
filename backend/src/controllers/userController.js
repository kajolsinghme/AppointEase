import { USER_TYPE } from "../constants/enums.js";
import { User, DoctorDetails } from "../models/User.js";


export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password").populate("doctorDetails");

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
      profileImage,
      specialization,
      yearsOfExperience,
      mobile,
      clinicAddress,
      city,
      state,
      consultationFee,
      availability,
      illnesses,
    } = req.body;

    console.log("apiimage",profileImage)

    const user = await User.findById(userId).populate("doctorDetails");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update common fields
    if (name) user.name = name;
    if (profileImage) user.profileImage = profileImage;

    if (user.role === USER_TYPE.DOCTOR) {
      let doctorDoc;

      if (user.doctorDetails) {
        doctorDoc = user.doctorDetails;
      } else {
        // Create a new doctor details document if not exists
        doctorDoc = new DoctorDetails();
        user.doctorDetails = doctorDoc._id;
      }

      if (specialization !== undefined) doctorDoc.specialization = specialization;
      if (yearsOfExperience !== undefined) doctorDoc.yearsOfExperience = yearsOfExperience;
      if (mobile !== undefined) doctorDoc.mobile = mobile;
      if (clinicAddress !== undefined) doctorDoc.clinicAddress = clinicAddress;
      if (city !== undefined) doctorDoc.city = city;
      if (state !== undefined) doctorDoc.state = state;
      if (consultationFee !== undefined) doctorDoc.consultationFee = consultationFee;
      if (availability !== undefined) doctorDoc.availability = availability;
      if (illnesses !== undefined) doctorDoc.illnesses = illnesses;

      await doctorDoc.save();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
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
    const doctors = await User.find({ role: "Doctor" }).select("-password").populate("doctorDetails");

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    return res.status(200).json({
      success: true,
      message: "List of all doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDoctorsAvailableToday = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" }).select("-password").populate("doctorDetails");

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    const weekdays = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
  };

    const today = weekdays[new Date().getDay()]
    console.log(today)

    const availableDoctors = doctors.filter((doctor) => doctor.doctorDetails?.availability?.some((slot) => slot.day === today))

    if(availableDoctors.length === 0){
      return res.status(404).json({
        success: false,
        message: `No doctors available today`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Doctors available on ${today} fetched successfully`,
      data: availableDoctors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const doctor = await User.findOne({ _id: doctorId, role: "Doctor" }).populate("doctorDetails");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor details fetched successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
