import { useState, useEffect } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

export const useMissionData = () => {
  const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.MISSIONS);
        setMissionData(response.data?.data || []);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mission data:", err);
        setError(err.response?.data?.error || "Failed to fetch mission data");
        setLoading(false);
      }
    };

    fetchMissionData();
  }, []);

  return { loading, error, missionData };
};
