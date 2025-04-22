import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BagIcon from "../assets/bag-icon.png";
import RupeesIcon from "../assets/money-bag-rupee-icon.png";
import LocationIcon from "../assets/location-icon.png";
import { useLocation } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "10 years",
    fees: "300 per visit",
    location: "Brooklyn, NY",
    illnesses: ["Headache", "Migraine", "Seizures"],
    availability: [
      { day: "Tuesday", startTime: "09:00 AM", endTime: "05:00 PM" },
      { day: "Wednesday", startTime: "09:00 AM", endTime: "05:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/men/49.jpg",
  },
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years",
    fees: "500 per visit",
    location: "Manhattan, NY",
    illnesses: ["Heart Pain", "High Blood Pressure", "Arrhythmia"],
    availability: [
      { day: "Monday", startTime: "10:00 AM", endTime: "04:00 PM" },
      { day: "Tuesday", startTime: "10:00 AM", endTime: "04:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/women/76.jpg",
  },
  {
    name: "Dr. Jacob Wilson",
    specialty: "Dermatologist",
    experience: "8 years",
    fees: "600 per visit",
    location: "Queens, NY",
    illnesses: ["Skin Rash", "Acne", "Eczema"],
    availability: [
      { day: "Monday", startTime: "08:00 AM", endTime: "03:00 PM" },
      { day: "Thursday", startTime: "11:00 AM", endTime: "06:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/men/94.jpg",
  },
  {
    name: "Dr. Emily Carter",
    specialty: "Pediatrician",
    experience: "12 years",
    fees: "400 per visit",
    location: "Bronx, NY",
    illnesses: ["Cold", "Fever", "Skin Rash"],
    availability: [
      { day: "Tuesday", startTime: "09:30 AM", endTime: "05:30 PM" },
      { day: "Friday", startTime: "09:30 AM", endTime: "05:30 PM" },
    ],
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Dr. David Lee",
    specialty: "Orthopedic Surgeon",
    experience: "20 years",
    fees: "800 per visit",
    location: "Staten Island, NY",
    illnesses: ["Joint Pain", "Fractures", "Arthritis"],
    availability: [
      { day: "Wednesday", startTime: "08:00 AM", endTime: "02:00 PM" },
      { day: "Saturday", startTime: "09:00 AM", endTime: "01:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Dr. Olivia Smith",
    specialty: "Psychiatrist",
    experience: "9 years",
    fees: "500 per visit",
    location: "Harlem, NY",
    illnesses: ["Anxiety", "Depression", "Insomnia"],
    availability: [
      { day: "Thursday", startTime: "12:00 PM", endTime: "06:00 PM" },
      { day: "Friday", startTime: "12:00 PM", endTime: "06:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const getNextAvailableDay = (availability) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayIdx = new Date().getDay();

  for (let i = 0; i < 7; i++) {
    const dayIdx = (todayIdx + i) % 7;
    const dayName = weekdays[dayIdx];
    const isAvailable = availability.some((slot) => slot.day === dayName);

    if (isAvailable) {
      if (i === 0) return "Available Today";
      if (i === 1) return "Available Tomorrow";
      return `Available on ${dayName}`;
    }
  }
  return "Not Available in the next 7 days";
};

const ExploreDoctors = () => {
  const location = useLocation();
  const params = URLSearchParams(location.search)
  const initialQuery = params.get("query") || ""
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-20">
        <div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search doctors or specialties..."
            className="w-10/12 ml-28 shadow-lg p-4 border border-gray-300 font-bold rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
          />

          <div className="py-3 flex justify-center">
            <div className="w-full max-w-6xl flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {/* Location */}
                <div className="flex flex-col gap-y-2 bg-white py-3 px-7 rounded-2xl shadow-lg">
                  <span className="font-bold">Location</span>
                  <select className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]">
                    <option value="" disabled>
                      All Location
                    </option>
                    <option>Gurgaon</option>
                    <option>Delhi</option>
                    <option>Noida</option>
                  </select>
                </div>

                {/* Illness */}
                <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                  <span className="font-bold">Illness</span>
                  <select className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]">
                    <option value="" disabled>
                      All Types
                    </option>
                    <option>Heart Pain</option>
                    <option>Skin Rash</option>
                    <option>Headache</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                  <span className="font-bold">Experience</span>
                  <select className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]">
                    <option value="" disabled>
                      Any Experience
                    </option>
                    <option value="5+">5+ years</option>
                    <option value="10+">10+ years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>

                {/* Fees */}
                <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                  <span className="font-bold">Fees</span>
                  <select className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]">
                    <option value="" disabled>
                      Any Range
                    </option>
                    <option value="under300">Under 300</option>
                    <option value="300-500">300–500</option>
                    <option value="over500">Over 500</option>
                  </select>
                </div>

                {/* Availability */}
                <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                  <span className="font-bold">Availability</span>
                  <select className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]">
                    <option value="" disabled>
                      Any Time
                    </option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-12 mt-8">
            {doctors.map((doctor) => (
              <div className="bg-white rounded-lg px-4 -900 w-[350px] py-4 shadow-2xl">
                <div className="flex gap-5 ">
                  <img
                    src={doctor.image}
                    alt="doctor-image"
                    className="w-24 h-auto rounded-full shadow-lg"
                  />
                  <div className="my-auto">
                    <h1 className="text-lg font-bold">{doctor.name}</h1>
                    <p className="text-gray-700 font-semibold mt-1">
                      {doctor.specialty}
                    </p>
                    <p
                      className={
                        getNextAvailableDay(doctor.availability) ===
                        "Available Today"
                          ? "text-green-600 font-semibold mt-2"
                          : "text-gray-500 font-semibold mt-2"
                      }
                    >
                      {getNextAvailableDay(doctor.availability)}
                    </p>
                  </div>
                </div>
                <div className="p-4 my-2 font-bold space-y-2">
                  <div className="flex gap-x-2 space-y-1 ">
                    <img src={BagIcon} alt="" className="w-7 h-auto" />
                    <p className="">{doctor.experience} experience</p>
                  </div>
                  <div className="flex gap-x-2 space-y-1">
                    <img src={RupeesIcon} alt="" className="w-7 h-auto" />
                    <p>{doctor.fees}</p>
                  </div>
                  <div className="flex gap-x-2 space-y-1">
                    <img src={LocationIcon} alt="" className="w-7 h-auto" />
                    <p>{doctor.location}</p>
                  </div>
                </div>
                <div className="flex justify-between ">
                  <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold text-lg py-2 px-7 rounded-lg">
                    Book Now
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-purple-600 border border-gray-500 text-lg font-bold py-2 px-7 rounded-lg">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreDoctors;
