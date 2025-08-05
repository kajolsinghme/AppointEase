import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExploreDoctors from "./pages/ExploreDoctors";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BookAppointment from "./pages/BookAppointment";
import Login from "./components/Auth/Login";
import Profile from "./pages/Profile";
import Signup from "./components/Auth/Signup";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore-doctors" element={<ExploreDoctors />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/book-appointment/:doctorId"
          element={<BookAppointment />}
        />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
