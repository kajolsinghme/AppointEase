import axios from "axios";

//create an axios instance

const apiClient = axios.create({
  baseURL:
    import.meta.env[`VITE_APP_BASE_URL_${import.meta.env.MODE.toUpperCase()}`],
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirect to login.");
      Example: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
