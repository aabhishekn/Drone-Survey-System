import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Services & Utils
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";
import { useDroneData } from "../hooks/useDroneData";

// Components
import MapModal from "../components/missions/MapModal";
import MissionConfirmationModal from "../components/missions/MissionConfirmationModal";

// Form Section Components
const BasicInfoSection = ({ missionData, onInputChange, droneData }) => (
  <div className="col-span-3 lg:col-span-1 space-y-4">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span className="p-1.5 bg-blue-50 rounded-md">
          <svg
            className="w-4 h-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        Basic Information
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mission Name
        </label>
        <input
          type="text"
          name="name"
          value={missionData.name}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={missionData.description}
          onChange={onInputChange}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Drone
        </label>
        <select
          name="droneId"
          value={missionData.droneId}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          required
        >
          <option value="">Select a drone</option>
          {droneData?.map((drone) => (
            <option key={drone.id} value={drone.id}>
              {drone.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

const FlightParamsSection = ({ missionData, onInputChange }) => (
  <div className="col-span-3 lg:col-span-1 space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <span className="p-1.5 bg-indigo-50 rounded-md">
        <svg
          className="w-4 h-4 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M12 5l7 7-7 7"
          />
        </svg>
      </span>
      Flight Parameters
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Altitude (m)
        </label>
        <input
          type="number"
          name="altitude"
          value={missionData.altitude}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Speed (m/s)
        </label>
        <input
          type="number"
          name="speed"
          value={missionData.speed}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          required
        />
      </div>
    </div>
  </div>
);

const ScheduleSection = ({ missionData, onInputChange }) => (
  <div className="col-span-3 lg:col-span-1 space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <span className="p-1.5 bg-purple-50 rounded-md">
        <svg
          className="w-4 h-4 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </span>
      Schedule
    </h3>
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start
        </label>
        <div className="flex gap-1 items-center">
          <input
            type="date"
            name="startDate"
            value={missionData.startDate}
            onChange={onInputChange}
            className="w-[120px] px-1 py-1.5 border border-gray-300 rounded-lg text-xs"
            required
          />
          <input
            type="time"
            name="startTime"
            value={missionData.startTime}
            onChange={onInputChange}
            className="w-[85px] px-1 py-1.5 border border-gray-300 rounded-lg text-xs"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End
        </label>
        <div className="flex gap-1 items-center">
          <input
            type="date"
            name="endDate"
            value={missionData.endDate}
            onChange={onInputChange}
            className="w-[120px] px-1 py-1.5 border border-gray-300 rounded-lg text-xs"
            required
          />
          <input
            type="time"
            name="endTime"
            value={missionData.endTime}
            onChange={onInputChange}
            className="w-[85px] px-1 py-1.5 border border-gray-300 rounded-lg text-xs"
            required
          />
        </div>
      </div>
    </div>
  </div>
);

const WaypointsSection = ({ waypoints, onOpenMap, onRemoveWaypoint }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <span className="p-1.5 bg-green-50 rounded-md">
        <svg
          className="w-4 h-4 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </span>
      Waypoints
    </h3>
    <button
      type="button"
      onClick={onOpenMap}
      className="w-full mb-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Select from Map
    </button>
    {waypoints.length > 0 ? (
      <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
        {waypoints.map((point, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-sm bg-white p-3 rounded-md shadow-sm"
          >
            <span className="text-gray-700">
              Point {idx + 1}: ({point[0].toFixed(4)}, {point[1].toFixed(4)})
            </span>
            <button
              type="button"
              onClick={() => onRemoveWaypoint(idx)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500 text-center py-4">
        No waypoints selected
      </p>
    )}
  </div>
);

// Constants
const INITIAL_MISSION_STATE = {
  name: "",
  description: "",
  droneId: "",
  altitude: "",
  speed: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  status: "planned",
};

const MissionPlanning = () => {
  const navigate = useNavigate();
  const { droneData } = useDroneData();

  // State
  const [waypoints, setWaypoints] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [missionData, setMissionData] = useState(INITIAL_MISSION_STATE);

  // Handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setMissionData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleWaypointsUpdate = useCallback((newWaypoints) => {
    setWaypoints(newWaypoints);
  }, []);

  const handleRemoveWaypoint = useCallback((index) => {
    setWaypoints((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const resetForm = useCallback(() => {
    setMissionData(INITIAL_MISSION_STATE);
    setWaypoints([]);
  }, []);

  const validateWaypoints = () => {
    if (waypoints.length < 2) {
      toast.error("Please select at least 2 waypoints");
      return false;
    }
    return true;
  };

  const handleCreateMission = async (e) => {
    e.preventDefault();
    if (!validateWaypoints()) return;

    try {
      const missionPayload = {
        ...missionData,
        area: "DEFAULT_AREA",
        startDate: new Date(
          `${missionData.startDate}T${missionData.startTime}`
        ).toISOString(),
        endDate: new Date(
          `${missionData.endDate}T${missionData.endTime}`
        ).toISOString(),
        status: "scheduled",
        flightParams: {
          altitude: parseFloat(missionData.altitude),
          speed: parseFloat(missionData.speed),
          sensors: { camera: true, thermal: false, lidar: false },
          dataCollection: { captureInterval: 5, overlapPercentage: 60 },
        },
        waypoints,
        isRecurring: false,
        recurringInterval: "weekly",
      };

      await toast.promise(api.post(API_ENDPOINTS.MISSIONS, missionPayload), {
        loading: "Creating mission...",
        success: () => {
          setShowConfirmation(true);
          return "Mission created successfully!";
        },
        error: (err) => err.response?.data?.error || "Failed to create mission",
      });
    } catch (error) {
      console.error("Error creating mission:", error);
      toast.error(error.message || "Failed to create mission");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Plan New Mission
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 max-w-full mx-auto">
        {/* Left Column - Form */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <form
              onSubmit={handleCreateMission}
              className="grid grid-cols-3 gap-6 p-6"
            >
              <BasicInfoSection
                missionData={missionData}
                onInputChange={handleInputChange}
                droneData={droneData}
              />
              <FlightParamsSection
                missionData={missionData}
                onInputChange={handleInputChange}
              />
              <ScheduleSection
                missionData={missionData}
                onInputChange={handleInputChange}
              />
              <div className="col-span-3 mt-4">
                <button
                  type="submit"
                  className="w-full h-10 flex justify-center items-center rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                  disabled={waypoints.length < 2}
                >
                  Create Mission
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Waypoints */}
        <div className="col-span-4">
          <WaypointsSection
            waypoints={waypoints}
            onOpenMap={() => setIsMapModalOpen(true)}
            onRemoveWaypoint={handleRemoveWaypoint}
          />
        </div>
      </div>

      {/* Modals */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onWaypointsChange={handleWaypointsUpdate}
      />

      <MissionConfirmationModal
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onPlanAnother={() => {
          setShowConfirmation(false);
          resetForm();
        }}
        onGoToMissions={() => navigate("/missions")}
      />
    </div>
  );
};

export default MissionPlanning;
