import apiClient from "./apiClient";

export const bookAppointment = async (data) => {
  try {
    const response = await apiClient.post("/appointments", data);
    console.log("Appointment booked:", response.data);
    return response;
  } catch (error) {
    console.error(
      "Failed to book appointment:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
