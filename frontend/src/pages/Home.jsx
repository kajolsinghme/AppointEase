import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import Footer from '../components/Footer/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import FeaturesSection from '../components/Features/FeaturesSection'
import DoctorsSection from '../components/DoctorsSection/DoctorsSection'
import HealthConcerns from '../components/HealthConcerns/HealthConcerns'
import FAQSection from '../components/FAQSection/FAQSection'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <SearchBar/>
        <DoctorsSection/>
        <FeaturesSection/>
        <HealthConcerns/>
        <FAQSection/>
        <Footer/>
    </div>
  )
}

export default Home