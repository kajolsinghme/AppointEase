// import React from "react";
// import Navbar from "../components/Navbar/Navbar";
// import { useParams } from "react-router-dom";

// const doctors = [
//   {
//     id: "1",
//     name: "Dr. Keaya Joseph",
//     email: "keayajoseph@gmail.com",
//     specialty: "Neurologist",
//     experience: "10 years",
//     fees: "300 per visit",
//     location: "Brooklyn, NY",
//     availability: [
//       { day: "Thursday", startTime: "09:00 AM", endTime: "05:00 PM" },
//       { day: "Friday", startTime: "09:00 AM", endTime: "05:00 PM" },
//       { day: "Saturday", startTime: "09:00 AM", endTime: "05:00 PM" },
//     ],
//     image: "https://randomuser.me/api/portraits/women/64.jpg",
//     rating: 4.8,
//     reviews: 280,
//     hospital: "Memorial Hospital, New York",
//     videoConsultation: true,
//   },
// ];

// const Profile = () => {
//   const { doctorId } = useParams();
//   const doctor = doctors.find((doc) => doc.id === doctorId);
//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen py-10 px-28">
//         <div className="w-full h-[80px] rounded-lg text-purple-500 bg-purple-500"></div>
//         <div className="bg-white w-full h-[800px] border-4 py-5 rounded-lg border-red-900">
//             <img src={doctor.image} alt="" />
//             <h1>{doctor.name}</h1>
//             <p>{doctor.email}</p>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { MultiSelect } from "@mantine/core";

const options = [
  { label: "Cold & Flu", value: "cold-flu" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  // ...other illnesses
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

  // Editable fields state
  const [profile, setProfile] = useState({
    fullName: "Dr. Alexa Rawles",
    specialization: "Neurologist",
    experience: 10,
    address: "Sushant Lok Phase 1",
    city: "Gurgaon",
    state: "Haryana",
    mobile: "",
    fee: 300,
    illnesses: [],
    availability: [],
  });

  // For adding new availability
  const [newAvailability, setNewAvailability] = useState({
    day: "",
    start: "",
    end: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      newAvailability.start &&
      newAvailability.end &&
      !profile.availability.some((a) => a.day === newAvailability.day)
    ) {
      setProfile((prev) => ({
        ...prev,
        availability: [...prev.availability, newAvailability],
      }));
      setNewAvailability({ day: "", start: "", end: "" });
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
              <img
                src="https://i.pravatar.cc/100"
                alt="Doctor"
                className="w-32 h-auto rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold mb-1">{profile.fullName}</h2>
                <p className="text-gray-600 font-semibold">
                  alexarawles@gmail.com
                </p>
              </div>
            </div>
            <button
              className="bg-purple-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-purple-800 transition"
              onClick={() => setIsEditing((prev) => !prev)}
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
                name="fullName"
                value={profile.fullName}
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
                name="experience"
                value={profile.experience}
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
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="input font-semibold rounded-md border border-gray-400 px-2 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                disabled={!isEditing}
                placeholder="Address"
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                City
              </label>
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
              <label className="block text-xl font-medium mb-2">
                State
              </label>
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
                name="fee"
                value={profile.fee}
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
                      {slot.start} - {slot.end}
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
                    value={newAvailability.start}
                    onChange={(e) =>
                      setNewAvailability((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <input
                    type="time"
                    value={newAvailability.end}
                    onChange={(e) =>
                      setNewAvailability((prev) => ({
                        ...prev,
                        end: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 rounded"
                  />
                  <button
                    onClick={handleAddAvailability}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
                    type="button"
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
