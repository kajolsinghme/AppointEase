import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorsAvailableToday } from "../../api/userAPI";

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctorsAvailableToday();
        if (data && Array.isArray(data.data)) {
          console.log("fetched data", data.data);
          setDoctors(data.data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch doctor data", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Available Doctors
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
        {doctors.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No doctors available today.
          </p>
        ) : (
          doctors.map((doctor, index) => {
            const {
              name,
              specialization,
              profileImage,
              consultationFee,
            } = doctor.doctorDetails;

            return (
              <div
                key={index}
                className="bg-white p-6 w-64 rounded-xl shadow-lg text-center"
              >
                <img
                  src={doctor.profileImage}
                  alt={name}
                  className="w-48 h-40 rounded-xl mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-gray-700 font-semibold mt-2">
                  {specialization}
                </p>
                <p className="text-md font-bold text-gray-500 mt-2">
                  Consultation Fee: ₹{consultationFee}
                </p>
                <button
                  onClick={() => navigate("/book-appointment")}
                  className="mt-4 bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

};

export default DoctorsSection;
