import { useState, useEffect } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

export const useMissionMonitoring = (missionId) => {
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulationActive, setSimulationActive] = useState(false);

  const processWaypoints = (waypoints) => {
    if (!Array.isArray(waypoints)) return [];
    return waypoints
      .map((wp) => {
        if (Array.isArray(wp) && wp.length === 2) {
          const [lat, lng] = wp.map((coord) => parseFloat(coord));
          if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
        }
        return null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchMissionData = async () => {
      if (!missionId || missionId === "undefined") {
        console.log("Invalid or missing mission ID");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(
          `${API_ENDPOINTS.MISSIONS}/${missionId}`
        );

        if (!isMounted) return;

        if (!response.data?.success) {
          throw new Error("Failed to fetch mission data");
        }

        const mission = response.data.data;

        if (!mission) {
          throw new Error("Mission not found");
        }

        const enhancedMission = {
          ...mission,
          progress: mission.progress || 0,
          droneBattery: mission.droneBattery || 100,
          signalStrength: mission.signalStrength || 100,
          waypoints: processWaypoints(mission.waypoints),
        };

        if (isMounted) {
          setMissionData(enhancedMission);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setMissionData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMissionData();
    return () => {
      isMounted = false;
    };
  }, [missionId]);

  const updateMissionStatus = async (newStatus) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.MISSIONS}/${missionId}`, {
        status: newStatus,
      });

      if (!response.data?.success) {
        throw new Error("Failed to update mission status");
      }

      setMissionData((prev) => ({ ...prev, status: newStatus }));
      return true;
    } catch (error) {
      console.error("Error updating mission status:", error);
      return false;
    }
  };

  const startSimulation = () => setSimulationActive(true);
  const pauseMission = () => setSimulationActive(false);
  const abortMission = async () => {
    const success = await updateMissionStatus("aborted");
    if (success) setSimulationActive(false);
  };

  return {
    missionData,
    loading,
    error,
    updateMissionStatus,
    startSimulation,
    pauseMission,
    abortMission,
    simulationActive,
  };
};
