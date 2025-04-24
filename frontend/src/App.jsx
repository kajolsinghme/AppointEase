import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home';
import ExploreDoctors from './pages/ExploreDoctors';
import About from './pages/About';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BookAppointment from './pages/BookAppointment';


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore-doctors' element={<ExploreDoctors/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/book-appointment/:doctorId' element={<BookAppointment/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
