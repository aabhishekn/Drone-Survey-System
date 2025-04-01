import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

export const useDroneData = () => {
  const [droneData, setDroneData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(API_ENDPOINTS.DRONES);
      console.log("Drone data response:", response.data);
      const dronesData = response.data?.data || [];
      setDroneData(dronesData);
    } catch (err) {
      console.error("Error fetching drones:", err);
      setError(err.message || "Failed to fetch drones");
      setDroneData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrones();
  }, [fetchDrones]);

  return {
    loading,
    error,
    droneData,
    setDroneData,
    refreshDrones: fetchDrones,
  };
};
