import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExploreDoctors from "./pages/ExploreDoctors";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BookAppointment from "./pages/BookAppointment";
import Login from "./components/Auth/Login";
import Profile from "./pages/Profile";
import Signup from "./components/Auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

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
