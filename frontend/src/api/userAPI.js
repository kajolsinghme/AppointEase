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
        const response = await apiClient.patch("user/profile", data)
        console.log(response.data)
        return response.data
    }  
    catch(error){
        console.log("Failed to update the user profile:", error.response.data)
    }  
}