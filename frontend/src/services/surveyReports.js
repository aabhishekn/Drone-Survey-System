import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const fetchReports = async (filters = {}) => {
  const response = await api.get(API_ENDPOINTS.REPORTS, {
    params: {
      ...filters,
      _t: new Date().getTime(), // Keep timestamp for cache busting
    },
  });
  return response;
};

export const exportReport = async (format, filters = {}) => {
  try {
    const response = await api.get(
      `${API_ENDPOINTS.REPORTS}/export/${format}`,
      {
        params: filters,
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.error("Export failed:", error.message);
    throw error;
  }
};

export const createReport = async (reportData) => {
  const response = await api.post(API_ENDPOINTS.REPORTS, reportData);
  return response;
};

export const updateReport = async (id, reportData) => {
  const response = await api.put(`${API_ENDPOINTS.REPORTS}/${id}`, reportData);
  return response;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.REPORTS}/${id}`);
  return response;
};
