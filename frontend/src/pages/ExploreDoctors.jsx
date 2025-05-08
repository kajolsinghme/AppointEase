import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BagIcon from "../assets/bag-icon.png";
import RupeesIcon from "../assets/money-bag-rupee-icon.png";
import LocationIcon from "../assets/location-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { getAllDoctors } from "../api/userAPI";
/*
const doctors = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
];*/

// Helper function to get next available day
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
  const navigate = useNavigate();

  // Get initial query from URL
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || "";

  const [doctors, setDoctors] = useState([]);

  const [query, setQuery] = useState(initialQuery);
  const [locationFilter, setLocationFilter] = useState("");
  const [illnessFilter, setIllnessFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [feesFilter, setFeesFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        if (data && Array.isArray(data.data)) {
          console.log("explore data", data.data);

          // Flatten doctorDetails into the main doctor object
          const flatDoctors = data.data.map((doc) => ({
            ...doc,
            ...doc.doctorDetails, // spread doctorDetails fields to top level
            id: doc._id 
          }));
          
          console.log("flatDoctors",flatDoctors)
          setDoctors(flatDoctors);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        console.log("Unable to load doctors", err);
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, []);

  const allLocations = useMemo(
    () => [...new Set(doctors.map((d) => d.city))],
    [doctors]
  );
  const allIllnesses = useMemo(
    () => [...new Set(doctors.flatMap((d) => d.illnesses))],
    [doctors]
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Search by name, specialty, or illnesses
      const lowerQuery = query.toLowerCase();
      const matchesQuery =
        !lowerQuery ||
        doctor.name.toLowerCase().includes(lowerQuery) ||
        doctor.specialization.toLowerCase().includes(lowerQuery) ||
        doctor.illnesses.some((ill) => ill.toLowerCase().includes(lowerQuery));

      // Location Filter
      const matchesLocation =
        !locationFilter || doctor.city === locationFilter;

      // Illness filter
      const matchesIllness =
        !illnessFilter || doctor.illnesses.includes(illnessFilter);

      // Experience filter
      const years = parseInt(doctor.yearsOfExperience);
      let matchesExperience = true;
      if (experienceFilter === "5+") matchesExperience = years >= 5;
      if (experienceFilter === "10+") matchesExperience = years >= 10;
      if (experienceFilter === "15+") matchesExperience = years >= 15;

      // Fees filter
      const fees = parseInt(doctor.consultationFee);
      let matchesFees = true;
      if (feesFilter === "under300") matchesFees = fees < 300;
      if (feesFilter === "300-500") matchesFees = fees >= 300 && fees <= 500;
      if (feesFilter === "over500") matchesFees = fees > 500;

      // Availability filter
      let matchesAvailability = true;
      if (availabilityFilter) {
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
        const today = weekdays[todayIdx];
        const tomorrow = weekdays[(todayIdx + 1) % 7];

        if (availabilityFilter === "Available Today") {
          matchesAvailability = doctor.availability.some(
            (slot) => slot.day === today
          );
        } else if (availabilityFilter === "Available Tomorrow") {
          matchesAvailability = doctor.availability.some(
            (slot) => slot.day === tomorrow
          );
        } else if (availabilityFilter === "Available in next 7 days") {
          matchesAvailability = doctor.availability.length > 0;
        } else {
          matchesAvailability = true;
        }
      }

      return (
        matchesQuery &&
        matchesLocation &&
        matchesIllness &&
        matchesExperience &&
        matchesFees &&
        matchesAvailability
      );
    });
  }, [
    doctors,
    query,
    locationFilter,
    illnessFilter,
    experienceFilter,
    feesFilter,
    availabilityFilter,
  ]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    navigate(`/explore-doctors?query=${encodeURIComponent(e.target.value)}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-20">
        <div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search doctors or specialties..."
            className="w-full md:w-10/12 ml-0 md:ml-28 shadow-lg p-4 border border-gray-300 font-bold rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
            value={query}
            onChange={handleSearch}
          />

          <div className="py-3 flex justify-center">
            <div className="w-full max-w-6xl flex flex-wrap justify-center gap-4">
              {/* Location */}
              <div className="flex flex-col gap-y-2 bg-white py-3 px-7 rounded-2xl shadow-lg">
                <span className="font-bold">Location</span>
                <select
                  className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {allLocations.map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              {/* Illness */}
              <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                <span className="font-bold">Illness</span>
                <select
                  className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                  value={illnessFilter}
                  onChange={(e) => setIllnessFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  {allIllnesses.map((illness) => (
                    <option key={illness}>{illness}</option>
                  ))}
                </select>
              </div>
              {/* Experience */}
              <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                <span className="font-bold">Experience</span>
                <select
                  className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                >
                  <option value="">Any Experience</option>
                  <option value="5+">5+ years</option>
                  <option value="10+">10+ years</option>
                  <option value="15+">15+ years</option>
                </select>
              </div>
              {/* Fees */}
              <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                <span className="font-bold">Fees</span>
                <select
                  className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                  value={feesFilter}
                  onChange={(e) => setFeesFilter(e.target.value)}
                >
                  <option value="">Any Range</option>
                  <option value="under300">Under 300</option>
                  <option value="300-500">300–500</option>
                  <option value="over500">Over 500</option>
                </select>
              </div>
              {/* Availability */}
              <div className="flex flex-col gap-y-3 bg-white p-3 rounded-2xl shadow-lg">
                <span className="font-bold">Availability</span>
                <select
                  className="border p-3 border-gray-300 rounded-xl text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option>Available Today</option>
                  <option>Available Tomorrow</option>
                  <option>Available in next 7 days</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-12 mt-8">
            {filteredDoctors.length === 0 && (
              <div className="col-span-full text-center text-gray-500 text-xl font-bold">
                No doctors found matching your criteria
              </div>
            )}
            {filteredDoctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg px-4 py-4 shadow-2xl w-full max-w-xs mx-auto"
              >
                <div className="flex gap-5">
                  <img
                    src={doctor.profileImage}
                    alt="doctor image"
                    className="w-24 h-auto rounded-full object-cover border border-gray-300 shadow-lg"
                  />
                  <div className="my-auto">
                    <h1 className="text-lg font-bold">{doctor.name}</h1>
                    <p className="text-gray-700 font-semibold mt-1">
                      {doctor.specialization}
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
                  <div className="flex gap-x-2 items-center">
                    <img src={BagIcon} alt="" className="w-7 h-auto" />
                    <p>{doctor.yearsOfExperience} Years of experience</p>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <img src={RupeesIcon} alt="" className="w-7 h-auto" />
                    <p>{doctor.consultationFee} per visit</p>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <img src={LocationIcon} alt="" className="w-7 h-auto" />
                    <p>{doctor.clinicAddress}, {doctor.city}, {doctor.state}</p>
                  </div>
                </div>
                <div className="flex justify-start ml-4 mt-2 ">
                  <button
                    className="bg-purple-600 hover:bg-purple-800 text-white font-bold text-lg py-2 px-5 rounded-lg"
                    onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                  >
                    Book Now
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
