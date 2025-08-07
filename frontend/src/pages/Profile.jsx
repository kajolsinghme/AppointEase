import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { MultiSelect } from "@mantine/core";
import { getUserProfile, updateUserProfile, uploadProfileImage } from "../api/userAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const options = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "Heart Disease", value: "heart-disease"},
  { label: "Allergies", value: "allergies"},
  { label: "Cold", value: "cold"},
  { label: "Fever", value: "fever"},
  { label: "Psoriasis", value: "psoriasis"},
  { label: "Acne", value: "acne"},
  { label: "Eczema", value: "eczema"},
  { label: "Hair Loss", value: "hair-loss"},
  { label: "Fractures", value: "fractures"},
  { label: "Joint Pain", value: "joint-pain"},
  { label: "Back Pain", value: "back-pain"},
  { label: "Arthritis", value: "arthritis"},
 
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState([]);
  const [imagePreview, setImagePreview] = useState(
    "https://i.postimg.cc/Dz99WDqt/user.png"
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    specialization: "",
    yearsOfExperience: 0,
    clinicAddress: "",
    city: "",
    state: "",
    mobile: "",
    consultationFee: 0,
    illnesses: [],
    availability: [],
  });

  // For adding new availability
  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      if (data) {
        console.log("name", data.data.name);
        setProfile({
          name: data.data.name ?? "",
          email: data.data.email ?? "",
          specialization: data.data.doctorDetails?.specialization ?? "",
          yearsOfExperience: data.data.doctorDetails?.yearsOfExperience ?? 0,
          clinicAddress: data.data.doctorDetails?.clinicAddress ?? "",
          city: data.data.doctorDetails?.city ?? "",
          state: data.data.doctorDetails?.state ?? "",
          mobile: data.data.doctorDetails?.mobile ?? "",
          consultationFee: data.data.doctorDetails?.consultationFee ?? 0,
          illnesses: data.data.doctorDetails?.illnesses ?? [],
          availability: data.data.doctorDetails?.availability ?? [],
        });
        setImagePreview(data.data.profileImage || "https://i.postimg.cc/Dz99WDqt/user.png");
      }
    };

    fetchProfile();
  }, []);

  const handleEditSave = async () => {
    if (isEditing) {
      try {
        const { email, ...updatedProfile } = profile;
        console.log("updatedProfile", updatedProfile);
        const response = await updateUserProfile(updatedProfile);
        console.log(response);
        toast.success("Profile updated successfully!")
        setIsEditing(false);
      } catch (err) {
        console.log("Failed to update the user profile:", err);
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      setIsEditing(true);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadProfileImage(formData)
      console.log("imgUrl",response.data.imageUrl)
      const imageUrl = response.data.imageUrl;

      setProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));

      await updateUserProfile({profileImage: imageUrl})
      setImagePreview(imageUrl)
      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Image upload failed or profile update failed:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  // Handle illnesses multi-select
  const handleIllnessesChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setProfile((prev) => ({
      ...prev,
      illnesses: selected,
    }));
  };

  // Handle adding availability
  const handleAddAvailability = () => {
    if (
      newAvailability.day &&
      newAvailability.startTime &&
      newAvailability.endTime &&
      !profile.availability.some((a) => a.day === newAvailability.day)
    ) {
      setProfile((prev) => ({
        ...prev,
        availability: [...prev.availability, newAvailability],
      }));
      setNewAvailability({ day: "", startTime: "", endTime: "" });
    }
  };

  // Remove availability for a day
  const handleRemoveAvailability = (day) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.filter((a) => a.day !== day),
    }));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-14 p-8 bg-white shadow-lg rounded-xl">
          {/* Top Section */}
          <div className="flex items-center justify-between pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-36 h-36 ">
                <img
                  src={imagePreview}
                  alt="Doctor"
                  className="w-full h-full object-cover rounded-full border border-gray-300 shadow-sm"
                />
                {isEditing && (
                  <label className="absolute inset-1 flex items-end justify-end rounded-full cursor-pointer hover:bg-opacity-50 transition ">
                    <span className="border border-purple-500 bg-purple-500 p-1 rounded-md ">📷</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-gray-600 font-semibold">{profile.email}</p>
              </div>
            </div>
            <button
              className="bg-purple-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-purple-800 transition"
              onClick={handleEditSave}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xl font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={profile.yearsOfExperience}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Clinic Address
              </label>
              <input
                type="text"
                name="clinicAddress"
                value={profile.clinicAddress}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
                placeholder="Enter clinic address"
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
                placeholder="Enter city"
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">State</label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
                placeholder="Enter state"
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Consultation Fee (INR)
              </label>
              <input
                type="number"
                name="consultationFee"
                value={profile.consultationFee}
                min={1}
                max={100000}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
              />
            </div>
            <MultiSelect
              label="Expertise In"
              placeholder="Search and select illnesses"
              data={options}
              searchable
              value={profile.illnesses}
              onChange={(value) =>
                setProfile((prev) => ({
                  ...prev,
                  illnesses: value,
                }))
              }
              classNames={{
                label: "font-medium !text-xl mb-2",
                input: "focus:ring-2 focus:ring-purple-800 rounded-md",
                dropdown: "rounded-lg shadow-lg",
                option: "hover:bg-purple-600 hover:text-white cursor-pointer",
              }}
              styles={{
                input: { fontSize: "1.125rem" },
                value: { fontSize: "1.125rem", fontWeight: 600 },
                placeholder: { fontSize: "1.125rem" },
                option: { fontSize: "1.125rem", fontWeight: 500 },
              }}
              disabled={!isEditing}
            />

            <div>
              <label className="block text-xl font-medium mb-2">
                Availability
              </label>
              <ul className="mb-2">
                {profile.availability.map((slot, idx) => (
                  <li key={idx} className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{slot.day}:</span>
                    <span>
                      {slot.startTime} - {slot.endTime}
                    </span>
                    {isEditing && (
                      <button
                        className="text-red-600 font-bold ml-2"
                        onClick={() => handleRemoveAvailability(slot.day)}
                        type="button"
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isEditing && (
                <div className="flex gap-2 items-center">
                  <select
                    value={newAvailability.day}
                    onChange={(e) =>
                      setNewAvailability((prev) => ({
                        ...prev,
                        day: e.target.value,
                      }))
                    }
                    className="border border-gray-300 px-4 py-2 rounded-lg"
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek
                      .filter(
                        (day) =>
                          !profile.availability.some((a) => a.day === day)
                      )
                      .map((day) => (
                        <option key={day} value={day} className="">
                          {day}
                        </option>
                      ))}
                  </select>
                  <input
                    type="time"
                    value={newAvailability.startTime}
                    onChange={(e) =>
                      setNewAvailability((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="time"
                    value={newAvailability.endTime}
                    onChange={(e) =>
                      setNewAvailability((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleAddAvailability}
                    className="bg-purple-600 text-white font-bold px-4 py-2 rounded hover:bg-purple-700 transition"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
