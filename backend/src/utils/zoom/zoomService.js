import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ZOOM_API_BASE_URL = "https://api.zoom.us/v2";

const getAccessToken = async () => {
  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID,
      },
      auth: {
        username: process.env.ZOOM_CLIENT_ID,
        password: process.env.ZOOM_CLIENT_SECRET,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to get Zoom access token", error);
    throw new Error("Zoom authentication failed");
  }
};

export const createZoomMeeting = async (userEmail, topic, startTime) => {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${ZOOM_API_BASE_URL}/users/${userEmail}/meetings`,
      {
        topic,
        type: 2, // Scheduled Meeting
        startTime,
        duration: 30, //30 mins
        timezone: "UTC",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          approval_type: 0,
          waiting_room: false
        },
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
      }
    );

    return response.data.join_url; //Zoom link for participants
  } catch (error) {
    console.error("Error creating Zoom meeting:", error.response?.data || error);
    throw new Error("Failed to create Zoom meeting");
  }
};
