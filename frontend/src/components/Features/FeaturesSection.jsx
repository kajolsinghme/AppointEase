import React from "react";

const features = [
  {
    title: "Easy Scheduling",
    description: "Book appointments in just a few clicks at your convenience.",
    icon: "🗓️",
  },
  {
    title: "Video Consultation",
    description: "Connect with doctors from the comfort of your home.",
    icon: "📹",
  },
  {
    title: "24/7 Support",
    description: "Get help and guidance anytime through our support channels.",
    icon: "🕒",
  }
];

const FeaturesSection = () => {
  return(
    <div className="w-full py-16 bg-gray-50 px-5">
        <div>
            <h2 className="text-4xl text-center font-bold mb-12 text-purple-800">Why Choose AppointEase?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div key={index} className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl transition duration-300">
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold mb-2 text-purple-700">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
};

export default FeaturesSection;
