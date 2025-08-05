import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { login } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));

      if (login.fulfilled.match(resultAction)) {
        console.log("Login successful:", resultAction.payload);
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/");
      } else {
        const serverMessage =
          resultAction?.payload?.message || "Invalid credentials.";
        toast.error(serverMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Something went wrong:", err);
    }
  };

  return (
    <div id="login">
      <Navbar />
      <div className="min-h-screen flex justify-center bg-gray-100 px-4 py-20">
        <div className="w-1/3 h-2/6 bg-white shadow-2xl rounded-xl p-8">
          <h1 className="text-[28px] font-bold text-center text-purple-700 mb-10">
            Login to Your Account
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Email
              </label>
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
              <label className="block mb-2 text-lg font-medium text-gray-700">
                Password
              </label>
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
              disabled={loading}
              className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-800 transition duration-200"
            >
              Login
            </button>
            <p className="text-lg text-center text-gray-600 mt-2">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-purple-700 font-medium hover:underline"
              >
                Signup
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
