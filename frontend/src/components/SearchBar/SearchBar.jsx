import React from "react";
import SearchIcon from "../../assets/magnifying-glass-search-white-icon.png";

const SearchBar = () => {
  return (
    <div id="find-doctor" className=" scroll-mt-20 w-full bg-white py-10 flex justify-center">
      <div className="w-full max-w-2xl h-14 flex items-center justify-between space-x-2 px-4 rounded-lg border border-gray-400">
        <input
          type="text"
          placeholder="Search for doctors, specialities or conditions..."
          className="flex-grow px-4 py-3 font-bold text-lg rounded-lg focus:outline-none"
        />
        <button className="w-32 h-10 bg-purple-600 text-white font-bold px-4 rounded-lg flex items-center justify-center space-x-2">
          <img src={SearchIcon} alt="search" className="w-5 h-5" />
          <span className="text-lg">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
