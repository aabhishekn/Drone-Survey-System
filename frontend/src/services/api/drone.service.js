import api from "./api.config";
import { handleApiError } from "../../utils/errors";
import { API_ENDPOINTS } from "../../utils/constants";

export const droneService = {
  async getDrones() {
    try {
      const { data } = await api.get(API_ENDPOINTS.DRONES);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async createDrone(droneData) {
    try {
      const { data } = await api.post(API_ENDPOINTS.DRONES, droneData);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async deleteDrone(id) {
    try {
      await api.delete(`${API_ENDPOINTS.DRONES}/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};
