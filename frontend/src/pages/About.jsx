import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const About = () => {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-700 text-lg">
            We are committed to connecting patients with experienced and trusted doctors across various specialties. Our mission is to make healthcare more accessible, convenient, and personalized for everyone.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#A020F0] mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm">
                To empower patients by giving them access to verified medical professionals and helping them make informed healthcare decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#A020F0] mb-2">Our Values</h3>
              <p className="text-gray-600 text-sm">
                Trust, Transparency, and Accessibility. We believe in building a platform that prioritizes patient care and experience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#A020F0] mb-2">Our Team</h3>
              <p className="text-gray-600 text-sm">
                We collaborate with skilled doctors, developers, and designers to create a smooth and reliable healthcare experience.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800">Meet Our Doctors</h2>
            <p className="text-gray-600 mt-2">Qualified professionals from top hospitals and clinics</p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="bg-white p-4 rounded-xl shadow text-center w-48">
                <img
                  src="https://randomuser.me/api/portraits/women/26.jpg"
                  alt="Doctor 1"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center w-48">
                <img
                  src="https://randomuser.me/api/portraits/men/85.jpg"
                  alt="Doctor 2"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <h4 className="font-medium text-gray-900">Dr. Michael Chen</h4>
                <p className="text-sm text-gray-500">Neurologist</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-center w-48">
                <img
                  src="https://randomuser.me/api/portraits/women/59.jpg"
                  alt="Doctor 3"
                  className="w-24 h-24 rounded-full mx-auto mb-2"
                />
                <h4 className="font-medium text-gray-900">Dr. Emily Wilson</h4>
                <p className="text-sm text-gray-500">Dermatologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default About
