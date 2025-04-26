import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import ProfilePic from "../../assets/Kajol_21f1001886.jpg"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="w-full h-20 flex items-center justify-between bg-white shadow-md sticky top-0 z-50 px-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-20 mt-6">
          <img src={Logo} alt="logo" className="rounded-full" />
        </div>
        <div className="font-bold text-3xl">
          <p>
            Appoint<span className="text-purple-700">Ease</span>
          </p>
        </div>
      </div>

      <div>
        <ul className="flex space-x-4 font-medium text-xl">
          <li>
            <a href="/" className="hover:text-purple-700 transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#health-concerns" className="hover:text-purple-700 transition duration-300">
              Health Concerns
            </a>
          </li>
          <li>
            <a href="#find-doctor" className="hover:text-purple-700 transition duration-300">
              Find a Doctor
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-purple-700 transition duration-300">
              About
            </a>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 relative">
        <button
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Log In
        </button>

        <div className="relative">
          <img
            src={ProfilePic}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50">
              <p
                className="px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile/1")}
              >
                Profile
              </p>
              <p
                className="px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={() => navigate("/logout")}
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
