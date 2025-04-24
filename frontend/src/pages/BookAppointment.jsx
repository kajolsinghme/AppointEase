import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BagIcon from "../assets/bag-icon.png";
import RupeesIcon from "../assets/money-bag-rupee-icon.png";
import LocationIcon from "../assets/location-icon.png";

const doctors = [
  {
    id: "1",
    name: "Dr. Keaya Joseph",
    specialty: "Neurologist",
    experience: "10 years",
    fees: "300 per visit",
    location: "Brooklyn, NY",
    availability: [
      { day: "Thursday", startTime: "09:00 AM", endTime: "05:00 PM" },
      { day: "Friday", startTime: "09:00 AM", endTime: "05:00 PM" },
      { day: "Saturday", startTime: "09:00 AM", endTime: "05:00 PM" },
    ],
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    rating: 4.8,
    reviews: 280,
    hospital: "Memorial Hospital, New York",
    videoConsultation: true,
  },

];

// Helper to get next 4 days from today
const getNextNDays = (n = 4) => {
  const days = [];
  const options = { weekday: "short", day: "2-digit", month: "short" };
  for (let i = 0; i < n; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      label: date.toLocaleDateString("en-US", options),
      date: date,
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
    });
  }
  return days;
};

const allSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM"
];

const BookAppointment = () => {
  const { doctorId } = useParams();
  const doctor = doctors.find((doc) => doc.id === doctorId);

  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("09:00 AM");
  const [appointmentType, setAppointmentType] = useState("in-person");

  const nextDays = getNextNDays(4);

  if (!doctor) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl font-bold text-red-600">Doctor not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-20">
        <div className="flex flex-col md:flex-row justify-around">
          {/* Doctor Card */}
          <div className="w-full md:w-[450px] h-[270px] px-5 py-7 bg-white rounded-2xl shadow-lg mb-8 md:mb-0">
            <div className="flex items-center gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
                <p className="text-lg font-semibold text-gray-700">
                  {doctor.specialty}
                </p>
              </div>
            </div>
            <div className="p-3 my-2 font-bold text-lg space-y-2">
              <div className="flex gap-x-2 items-center">
                <img src={LocationIcon} alt="" className="w-5 h-5" />
                <span>{doctor.hospital}</span>
              </div>
              <div className="flex gap-x-2 items-center text-green-700">
                <span>✔</span>
                <span>Available Today</span>
              </div>
              {doctor.videoConsultation && (
                <div className="flex gap-x-2 items-center text-purple-700">
                  <span>🎥</span>
                  <span>Video Consultation Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Selection Card */}
          <div className="w-full md:w-[820px] px-6 py-7 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Select Appointment Date & Time</h1>
            {/* Date selection */}
            <div className="flex gap-3 mb-10">
              {nextDays.map((d, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 font-semibold
                    ${selectedDayIdx === idx
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-black border-gray-300"}
                  `}
                  onClick={() => setSelectedDayIdx(idx)}
                >
                  <span>{d.label.split(" ")[0]}</span>
                  <span className="text-lg">{d.label.split(" ")[1]}</span>
                  <span className="text-xs">{d.label.split(" ")[2]}</span>
                </button>
              ))}
            </div>
            {/* Time slot selection */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              {allSlots.map((slot) => (
                <button
                  key={slot}
                  className={`py-2 rounded-lg border-2 font-semibold
                    ${selectedSlot === slot
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-black border-gray-300"}
                  `}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            {/* Appointment type */}
            <div className="mb-10">
              <h2 className="font-semibold mb-5">Select Appointment Type</h2>
              <div className="flex gap-4">
                <button
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 font-semibold
                    ${appointmentType === "in-person"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-black border-gray-300"}
                  `}
                  onClick={() => setAppointmentType("in-person")}
                >
                  <span>👤</span> In-Person Visit
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 font-semibold
                    ${appointmentType === "video"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-black border-gray-300"}
                  `}
                  onClick={() => setAppointmentType("video")}
                >
                  <span>🎥</span> Video Consultation
                </button>
              </div>
            </div>
            {/* Confirm Button */}
            <button className="w-full py-3 rounded-lg font-bold text-lg bg-purple-600 text-white hover:bg-purple-700 transition">
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
