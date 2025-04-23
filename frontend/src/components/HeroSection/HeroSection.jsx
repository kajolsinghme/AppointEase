import React from "react";
import heroImage from "../../assets/space-stethoscope-pills.jpg";
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <section
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="relative z-10 flex items-center justify-start h-full px-8">
        <div className="w-3/5">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-2xl mb-9 text-gray-800 font-bold">
            Connect with top healthcare professionals and manage your medical
            appointments with ease.
          </p>
          <div className="space-x-4 flex ">
            <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg" 
            onClick={() => navigate('/explore-doctors')}
            >
              Book Appointment
            </button>
            <button className="bg-white hover:bg-gray-100 text-purple-600 text-lg font-bold py-3 px-8 rounded-lg"
            >
              <a href="#health-concerns">Learn More</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
