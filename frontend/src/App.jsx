import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home';
import ExploreDoctors from './pages/ExploreDoctors';
import About from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore-doctors' element={<ExploreDoctors/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
