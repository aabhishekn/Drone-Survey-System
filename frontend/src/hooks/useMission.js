import { useState, useCallback } from "react";
import { missionService } from "../services/api/mission.service";
import { useAppContext } from "../contexts/AppContext";
import { toast } from "react-hot-toast";

export const useMission = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();

  const fetchMission = useCallback(
    async (id) => {
      try {
        setLoading(true);
        const data = await missionService.getMissionById(id);
        dispatch({ type: "SET_CURRENT_MISSION", payload: data });
        return data;
      } catch (err) {
        toast.error(err.message);
        dispatch({ type: "ADD_ERROR", payload: err });
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    loading,
    fetchMission,
  };
};
