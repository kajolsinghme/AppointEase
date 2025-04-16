import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <p>&copy; 2025 AppoointEase. All rights reserved.</p>
      <div>
        <a href="#" className="text-white hover:text-gray-400 mx-2">Facebook</a>
        <a href="#" className="text-white hover:text-gray-400 mx-2">Twitter</a>
        <a href="#" className="text-white hover:text-gray-400 mx-2">Instagram</a>
      </div>
      <div className="mt-4">
        <a href="#" className="text-white hover:text-gray-400 mx-2">Privacy Policy</a>
        <a href="#" className="text-white hover:text-gray-400 mx-2">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
