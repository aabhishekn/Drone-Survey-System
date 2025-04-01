import api from "./api.config";
import { handleApiError } from "../../utils/errors";
import { API_ENDPOINTS } from "../../utils/constants";

export const missionService = {
  async getMissions() {
    try {
      const { data } = await api.get(API_ENDPOINTS.MISSIONS);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async createMission(missionData) {
    try {
      const { data } = await api.post(API_ENDPOINTS.MISSIONS, missionData);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async updateMission(id, missionData) {
    try {
      const { data } = await api.put(
        `${API_ENDPOINTS.MISSIONS}/${id}`,
        missionData
      );
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getMissionById(id) {
    try {
      const { data } = await api.get(`${API_ENDPOINTS.MISSIONS}/${id}`);
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getMissionTelemetry(id) {
    try {
      const { data } = await api.get(
        `${API_ENDPOINTS.MISSIONS}/${id}/telemetry`
      );
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
