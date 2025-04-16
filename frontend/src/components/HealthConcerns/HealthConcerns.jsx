import React from "react";
import SearchIcon from "../../assets/Icontexto-Search-Search-purple.png"
const healthConditions = [
  {
    title: "Cardiology",
    description: "Heart-related issues and consultations",
    icon: "❤️",
  },
  {
    title: "Dermatology",
    description: "Skin problems and treatments",
    icon: "🌿",
  },
  {
    title: "Pediatrics",
    description: "Child healthcare and development",
    icon: "🧸",
  },
  {
    title: "Orthopedics",
    description: "Bone and joint pain treatments",
    icon: "🦴",
  },
];

const HealthConcerns = () => {
  return (
    <div id="health-concerns" className="py-16 bg-white">
      <h2 className="flex justify-center items-center space-x-2 text-4xl font-bold text-center text-purple-800 mb-5">
            <img src={SearchIcon} alt="Search Icon" className="w-11 h-10 " />
            <span>Find Doctors by Health Concern</span>
      </h2>
      <p className="text-center max-w-7xl mx-auto text-gray-600 text-lg mb-12 px-4">
        Consult top specialists online for any health concern — from general symptoms to expert care, get matched with the right doctor instantly.
      </p>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {healthConditions.map((healthCondition, index) => (
          <div key={index} className="bg-gray-100 text-center p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300 " >
            <div className="text-6xl mb-5">{healthCondition.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{healthCondition.title}</h3>
            <p className="text-gray-800">{healthCondition.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthConcerns;
