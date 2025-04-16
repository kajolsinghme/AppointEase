import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import Footer from '../components/Footer/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import FeaturesSection from '../components/Features/FeaturesSection'
import DoctorsSection from '../components/DoctorsSection/DoctorsSection'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <SearchBar/>
        <FeaturesSection/>
        <DoctorsSection/>
        <Footer/>
    </div>
  )
}

export default Home