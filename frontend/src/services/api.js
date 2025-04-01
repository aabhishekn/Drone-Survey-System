import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

const logRequest = (config) => {
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(
    "API Request:",
    config.method.toUpperCase(),
    fullUrl,
    config.data
  );
  return config;
};

const handleResponseError = (error) => {
  const errorDetails = {
    status: error.response?.status,
    url: error.config?.url,
    message: error.message,
  };
  console.error("API Error:", errorDetails);

  if (error.response?.status === 404) {
    throw new Error(
      `API endpoint ${error.config.url} not found. Please check the URL and try again.`
    );
  }

  if (error.code === "ECONNABORTED") {
    throw new Error("Request timeout. Please try again.");
  }

  throw error;
};

api.interceptors.request.use(logRequest, (error) => Promise.reject(error));
api.interceptors.response.use((response) => {
  console.log("API Response:", response.status, response.data);
  return response;
}, handleResponseError);

export default api;
