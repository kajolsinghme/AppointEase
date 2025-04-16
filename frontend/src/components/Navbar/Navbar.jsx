import React from "react";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="w-full h-20 flex items-center justify-between bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-20 ml-4 mt-6">
          <img src={Logo} alt="" className="rounded-full" />
        </div>
        <div className="font-bold text-3xl">
          <p>
            Appoint<span className="text-purple-700">Ease</span>{" "}
          </p>
        </div>
      </div>
      <div>
        <ul className="flex space-x-4 font-medium text-xl">
          <li>
            <a href="/" className="hover:text-purple-700 transition duration-300">Home</a>
          </li>
          <li>
            <a href="/" className="hover:text-purple-700 transition duration-300">Services</a>
          </li>
          <li>
            <a href="/" className="hover:text-purple-700 transition duration-300">Find a Doctor</a>
          </li>
          <li>
            <a href="/" className="hover:text-purple-700 transition duration-300">About</a>
          </li>
        </ul>
      </div>
      <div>
        <button className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg mr-5">
          Log in
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
