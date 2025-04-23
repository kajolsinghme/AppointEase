import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home';
import ExploreDoctors from './pages/ExploreDoctors';
import About from './pages/About';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore-doctors' element={<ExploreDoctors/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
