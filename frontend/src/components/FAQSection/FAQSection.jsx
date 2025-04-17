import React, { useState } from "react";
import faq from "../../assets/faq.jpg";

const faqs = [
  {
    question: "How can I book an appointment?",
    answer:
      "You can book online through our search feature or by clicking 'Book Appointment' on a doctor's profile.",
  },
  {
    question: "Are online consultations available?",
    answer:
      "Yes, many of our doctors offer video consultations directly through the platform.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer: "Absolutely! You can manage appointments through your dashboard.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes, browsing and searching is free. Consultation fees depend on the doctor.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div id="faq" className=" scroll-mt-16 py-16 px-4 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="w-full md:w-1/2 flex justify-center md:sticky top-16">
          <img
            src={faq}
            alt="FAQ"
            className="w-[460px] h-auto  rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-purple-700">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-purple-300 p-6 rounded-lg bg-white shadow-sm"
              >
                <button
                  className="w-full text-left font-semibold text-lg text-purple-900 focus:outline-none"
                  onClick={() => toggle(index)}
                >
                  {faq.question}
                </button>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
