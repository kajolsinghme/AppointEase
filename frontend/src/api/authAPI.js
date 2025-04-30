import apiClient from "./apiClient"

export const signupUser = async(data) => {
    const response = await apiClient.post("/auth/signup", data);
    return response.data
}

export const loginUser = async(data) => {
    const response = await apiClient.post("/auth/login", data)
    return response.data
}

export const logoutUser = async() => {
    localStorage.removeItem("token")
}