import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import BagIcon from "../assets/bag-icon.png";
import RupeesIcon from "../assets/money-bag-rupee-icon.png";
import LocationIcon from "../assets/location-icon.png";
import { getDoctorById } from "../api/userAPI";
import { bookAppointment } from "../api/appointmentAPI";

const doctors = [
  {
    id: "6815436df342b5a6edbeef0f",
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

// Helper function to get next available day
const checkDoctorAvailability = (availability) => {
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

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [appointmentType, setAppointmentType] = useState("In Person");

  useEffect(() => {
    const fetchDoctorById = async () => {
      try {
        const response = await getDoctorById(doctorId);
        if (response.success) {
          console.log("doctor details", response.data);
          setDoctorData(response.data);
        } else {
          console.error("Unexpected data format:", data);
          setDoctorData(null);
        }
      } catch (error) {
        console.error("Failed to fetch doctor data", error);
      }
    };
    fetchDoctorById();
  }, []);

  // Helper to get next n days from today
  const getNextNDays = (n) => {
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
  const nextDays = getNextNDays(7);

  const availableDayNames = doctorData?.doctorDetails?.availability.map(
    (slot) => slot.day
  );

  const availableNextDays = nextDays.filter((day) =>
    availableDayNames?.includes(day.dayName)
  );

  function timeToMinutes(timeStr) {
    if (!timeStr) return 0;
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Function to get available slots
  function generateSlots(startTime, endTime) {
    const slots = [];
    let start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);
    while (start < end) {
      const h = Math.floor(start / 60);
      const m = start % 60;
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const label = `${hour12.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")} ${period}`;
      slots.push(label);
      start += 30;
    }
    return slots;
  }

  // Get the selected day's name
  const selectedDayName = availableNextDays[selectedDayIdx]?.dayName;

  // Find availability for that day
  const dayAvailability = doctorData?.doctorDetails?.availability.find(
    (slot) => slot.day === selectedDayName
  );

  // Generate slots for that day
  const availableSlots = dayAvailability
    ? generateSlots(dayAvailability.startTime, dayAvailability.endTime)
    : [];

  if (!doctorData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-2xl font-bold text-red-600">Doctor not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const handleBookAppointment = async() => {
    try{
      if (!selectedSlot) {
        alert("Please select a time slot");
        return;
      }

      const selectedDay = availableNextDays[selectedDayIdx]?.date

      const [time, period] = selectedSlot.split(" ")
      let [hours, minutes] = time.split(":").map(Number)
      
      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) hours += 12
      if (period === "AM" && hours === 12) hours = 0

      const appointmentDate = new Date(selectedDay);
      appointmentDate.setHours(hours, minutes, 0, 0);

       // Format to ISO string 
       const appointmentDateTime = appointmentDate.toISOString()

      const response = await bookAppointment({
        doctorId: doctorId,
        scheduledAt: appointmentDateTime,
        type: appointmentType
      })
      console.log(response)
    }
    catch(error){
      console.log("Failed to book the appointment", error);
    }
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
                src={doctorData.profileImage}
                alt={doctorData.name}
                className="w-28 h-28 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold mb-1">{doctorData.name}</h1>
                <p className="text-lg font-semibold text-gray-700">
                  {doctorData.doctorDetails.specialization}
                </p>
              </div>
            </div>
            <div className="p-3 my-2 font-bold text-lg space-y-2">
              <div className="flex gap-x-2 items-center">
                <img src={LocationIcon} alt="" className="w-5 h-5" />
                <span>
                  {doctorData.doctorDetails.clinicAddress},{" "}
                  {doctorData.doctorDetails.city},{" "}
                  {doctorData.doctorDetails.state}
                </span>
              </div>
              <div className="flex gap-x-2 items-center text-green-700">
                <span>✔</span>
                <span>
                  {checkDoctorAvailability(
                    doctorData.doctorDetails.availability
                  )}
                </span>
              </div>

              <div className="flex gap-x-2 items-center text-purple-700">
                <span>🎥</span>
                <span>Video Consultation Available</span>
              </div>
            </div>
          </div>

          {/* Appointment Selection Card */}
          <div className="w-full md:w-[820px] px-6 py-7 bg-white rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-6">
              Select Appointment Date & Time
            </h1>
            {/* Date selection */}
            <div className="flex gap-7 mb-10">
              {availableNextDays.map((d, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center px-6 py-2 rounded-lg border-2 font-semibold
                    ${
                      selectedDayIdx === idx
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-black border-gray-300"
                    }
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
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  className={`py-2 rounded-lg border-2 font-semibold
                    ${
                      selectedSlot === slot
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-black border-gray-300"
                    }
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
                    ${
                      appointmentType === "In Person"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-black border-gray-300"
                    }
                  `}
                  onClick={() => setAppointmentType("In Person")}
                >
                  <span>👤</span> In-Person Visit
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg border-2 font-semibold
                    ${
                      appointmentType === "Video Consultation"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-black border-gray-300"
                    }
                  `}
                  onClick={() => setAppointmentType("Video Consultation")}
                >
                  <span>🎥</span> Video Consultation
                </button>
              </div>
            </div>

            <button className="w-full py-3 rounded-lg font-bold text-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            onClick={handleBookAppointment}>
              
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
