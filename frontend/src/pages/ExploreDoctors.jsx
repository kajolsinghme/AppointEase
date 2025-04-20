import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "15 years",
    fees: "$100 per visit",
    location: "Manhattan, NY",
    image: "https://via.placeholder.com/64",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "10 years",
    fees: "$150 per visit",
    location: "Brooklyn, NY",
    image: "https://via.placeholder.com/64",
  },
  {
    name: "Dr. Emily Wilson",
    specialty: "Dermatologist",
    experience: "8 years",
    fees: "$120 per visit",
    location: "Queens, NY",
    image: "https://via.placeholder.com/64",
  },
];

const ExploreDoctors = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-20">
        <div className="mx-auto">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExploreDoctors;
