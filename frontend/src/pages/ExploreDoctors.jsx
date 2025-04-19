import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ExploreDoctors = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialQuery = params.get("query") || ""

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [filteredDoctors, setFilteredDoctors] = useState([])

  useEffect(() => {
    // Simulated filtering logic
    const doctors = [...yourFullDoctorList] 
    const results = doctors.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDoctors(results)
  }, [searchTerm])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Explore Doctors</h1>
      <input
        className="border p-2 rounded mb-6 w-full max-w-md"
        type="text"
        placeholder="Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div>
        {filteredDoctors.map((doc, idx) => (
          <div key={idx} className="border p-4 rounded mb-4">
            <h2>{doc.name}</h2>
            <p>{doc.speciality}</p>
            <p>{doc.experience} years experience</p>
            <p>₹{doc.fees}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreDoctors
