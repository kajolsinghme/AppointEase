import {BrowserRouter, Routes, Route}  from 'react-router-dom'
import Home from './pages/Home';
import ExploreDoctors from './pages/ExploreDoctors';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/explore-doctors' element={<ExploreDoctors/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
