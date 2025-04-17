import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-10 mt-12">
      <div className="px-8 max-w-screen-xl mx-auto flex justify-between">
        <div className="">
          <h2 className="text-2xl font-bold">AppointEase</h2>
          <p className="mt-2 text-sm text-gray-300">
            Your trusted partner in booking medical consultations online.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-200">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#find-doctor" className="hover:text-white">
                Find a Doctor
              </a>
            </li>
            <li>
              <a href="#health-concerns" className="hover:text-white">
                Health Concerns
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-300">
            Email: support@appointease.com
          </p>
          <p className="text-sm text-gray-300 mt-1">Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-200 border-t border-purple-800 pt-4">
        © {new Date().getFullYear()} AppointEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
