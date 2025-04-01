import { useState, useCallback } from "react";
import { droneService } from "../services/api/drone.service";
import { toast } from "react-hot-toast";

export const useDrone = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drones, setDrones] = useState([]);

  const fetchDrones = useCallback(async () => {
    try {
      setLoading(true);
      const data = await droneService.getDrones();
      setDrones(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    drones,
    loading,
    error,
    fetchDrones,
  };
};
