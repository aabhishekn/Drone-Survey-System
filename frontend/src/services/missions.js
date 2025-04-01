import api from "./api";
import { API_ENDPOINTS } from "../utils/constants";

export const fetchMission = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.MISSIONS}/${id}`);
  return response;
};

export const createMission = async (missionData) => {
  const response = await api.post(API_ENDPOINTS.MISSIONS, missionData);
  return response;
};

export const updateMissionStatus = async (id, status) => {
  const response = await api.patch(`${API_ENDPOINTS.MISSIONS}/${id}/status`, {
    status,
  });
  return response;
};

export const updateMission = async (id, missionData) => {
  const response = await api.put(
    `${API_ENDPOINTS.MISSIONS}/${id}`,
    missionData
  );
  return response;
};

export const deleteMission = async (id) => {
  const response = await api.delete(`${API_ENDPOINTS.MISSIONS}/${id}`);
  return response;
};

export const fetchMissionStats = async () => {
  const response = await api.get(API_ENDPOINTS.MISSION_STATS);
  return response;
};
