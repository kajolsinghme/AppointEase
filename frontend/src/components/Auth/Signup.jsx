import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../store/auth/authSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });
  const {loading, data, error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      const resultAction = await dispatch(signup({...formData}))
      if(signup.fulfilled.match(resultAction)){
        console.log('Signup successful:', resultAction.payload)
        navigate('/login')
      }
      else{
        console.error("Signup failed:", resultAction.payload);
      }
    }
    catch(error){
      console.error("Something went wrong:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex justify-center px-4 py-10">
        <div className="w-1/3 h-2/6 bg-white shadow-2xl rounded-xl p-8">
          <h1 className="text-purple-700 font-bold text-[28px] text-center mb-8">
            Create Your Account
          </h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                required
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 font-bold rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Sign up
            </button>
            <p className="text-center text-lg text-gray-600 mt-2">
              Already have an account? <a href="/login" className="text-purple-700 font-medium hover:underline">Login</a>
            </p>
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
