import apiClient from "./apiClient"

export const getUserProfile = async() => {
    try{
        const response = await apiClient.get("/user/profile")
        console.log(response.data)
        return response.data
    }
    catch(error){
        console.error("Failed to fetch user profile:", error.response.data)
    }
}

export const updateUserProfile = async(data) => {
    try{
        console.log("url",data)
        const response = await apiClient.patch("user/profile", data)
        console.log(response.data)
        return response.data
    }  
    catch(error){
        console.log("Failed to update the user profile:", error.response.data)
    }  
}

export const uploadProfileImage = async(formData) => {
    try{
        const response  = apiClient.post("/upload", formData,{headers: {
            "Content-Type": "multipart/form-data",
          }})
        
        return response
    }
    catch(error){
        console.log("Failed to upload profile image:", error.response.data)
    }  
}

export const getDoctorsAvailableToday = async() => {
    try{
        const response = await apiClient.get("/user/doctors/today")
        console.log("Doctors available today", response.data);
        return response.data
    }
    catch(error){
        console.error("Failed to fetch doctors :", error.response.data)
    }
}


export const getAllDoctors = async() => {
    try{
        const response = await apiClient.get("/user/doctors")
        console.log("Fetched Data", response.data);
        return response.data
    }
    catch(error){
        console.error("Failed to fetch doctors :", error.response.data)
    }
}

export const getDoctorById= async(doctorId) => {
    try{
        const response = await apiClient.get(`/user/doctors/${doctorId}`)
        console.log("data", response.data);
        return response.data
    }
    catch(error){
        console.error("Failed to fetch doctor :", error.response.data)
    }
}