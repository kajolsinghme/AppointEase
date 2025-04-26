import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add actual login logic here (API call)
    console.log('Logging in with', email, password);
    navigate('/'); 
  };

  return (
    <div id="login">
      <Navbar/>
      <div className="min-h-screen flex justify-center bg-gray-100 px-4 py-20">
        <div className="w-1/3 h-2/6 bg-white shadow-2xl rounded-xl p-8">
          <h1 className="text-[28px] font-bold text-center text-purple-700 mb-10">Login to Your Account</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2  mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-700"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Login
            </button>
            <p className="text-lg text-center text-gray-600 mt-2">
              Don’t have an account? <a href="/register" className="text-purple-700 font-medium hover:underline">Register</a>
            </p>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
