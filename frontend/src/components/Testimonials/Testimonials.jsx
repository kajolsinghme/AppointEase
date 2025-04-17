import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "Patient",
    testimonial:
      "The online consultation was incredibly convenient and helpful. I was able to consult with a doctor within minutes!",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Jane Smith",
    role: "Patient",
    testimonial:
      "I was really impressed with the easy-to-use interface and how quickly I was able to book an appointment with a top doctor.",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    name: "Emily Clark",
    role: "Patient",
    testimonial:
      "Booking appointments for my family has never been easier! The platform is a game-changer for managing healthcare.",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-purple-800 mb-12">What Our Patients Say</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 px-32">
          {testimonials.map((testimonial, index) => (
            <div key={index} className=" bg-white shadow-lg rounded-lg w-80 h-auto px-10 py-6 border border-gray-400">
              <img src={testimonial.image} alt={testimonial.name}
                className="w-60 h-56 object-cover rounded-lg mb-6 "/>
              <div>
                <p className="text-gray-700 text-lg italic mb-4">{testimonial.testimonial}</p>
                <h3 className="text-xl font-semibold text-purple-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
