  import React, { useState } from "react";
  import {useNavigate } from "react-router-dom";

  const doctors = [
    {
      name: "Dr. Mary Rachel",
      specialty: "Cardiologist",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      timing: "Mon - Fri, 10 AM - 4 PM",
    },
    {
      name: "Dr. Elliot Ambrose",
      specialty: "Dermatologist",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      timing: "Tue - Sat, 1 PM - 6 PM",
    },
    {
      name: "Dr. Sharon Hester",
      specialty: "Pediatrician",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
      timing: "Mon - Sat, 9 AM - 2 PM",
    },
    {
      name: "Dr. Rehan Bansal",
      specialty: "Surgeon",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      timing: "Mon - Fri, 9 AM - 2 PM",
    },
  ];

  const DoctorsSection = () => {
    const navigate = useNavigate()
    return (
      <div className="py-16 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-10 text-purple-800">Available Doctors</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white p-6 w-64 rounded-xl shadow-lg text-center">
              <img src={doctor.image} alt={doctor.name} className="w-48 h-40 rounded-xl mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-bold">{doctor.name}</h3>
              <p className="text-gray-700 font-semibold mt-2">{doctor.specialty}</p>
              <p className="text-sm text-gray-500 mt-2">{doctor.timing}</p>
              <button onClick={() => navigate('/book-appointment')} className="mt-4 bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default DoctorsSection;
