import apiClient from "./apiClient"

export const bookAppointment = async (data) => {
    try{
        const response = await apiClient.post("/appointments", data)
        console.log(response.data)
        return response
    }
    catch(error){
        console.log("Failed to book appointment", error.response.data)
    }
}