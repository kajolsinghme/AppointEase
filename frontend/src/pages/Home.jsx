import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import Footer from '../components/Footer/Footer'
import SearchBar from '../components/SearchBar/SearchBar'
import FeaturesSection from '../components/Features/FeaturesSection'
import DoctorsSection from '../components/DoctorsSection/DoctorsSection'
import HealthConcerns from '../components/HealthConcerns/HealthConcerns'
import FAQSection from '../components/FAQSection/FAQSection'
import Testimonials from '../components/Testimonials/Testimonials'

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
        <Testimonials/>
        <Footer/>
    </div>
  )
}

export default Home