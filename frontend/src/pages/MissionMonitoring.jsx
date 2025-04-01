import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMissionMonitoring } from "../hooks/useMissionMonitoring";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MapComponent from "../components/maps/MapComponent";
import { getStatusColor } from "../utils/statusHelpers";

// Component for mission controls
const MissionControls = ({ status, onStart, onPause, onAbort, onComplete }) => (
  <div className="flex gap-2">
    {status === "scheduled" && (
      <button
        onClick={onStart}
        className="mission-btn bg-gradient-to-r from-green-600 to-green-700"
      >
        Start Mission
      </button>
    )}
    {status === "in-progress" && (
      <>
        <button onClick={onPause} className="mission-btn bg-yellow-500">
          Pause
        </button>
        <button onClick={onAbort} className="mission-btn bg-red-500">
          Abort
        </button>
        <button onClick={onComplete} className="mission-btn bg-blue-500">
          Complete
        </button>
      </>
    )}
  </div>
);

// Component for progress bar
const ProgressBar = ({ value, color = "bg-blue-500" }) => (
  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
    <div
      className={`h-full ${color} transition-all duration-500`}
      style={{ width: `${value || 0}%` }}
    />
  </div>
);

const MissionMonitoring = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    missionData,
    loading,
    error,
    updateMissionStatus,
    startSimulation,
    pauseMission,
    abortMission,
  } = useMissionMonitoring(id);

  useEffect(() => {
    if (!id || id === "undefined") {
      toast.error("Invalid mission ID");
      navigate("/missions", { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (error) {
      console.error("Mission error:", error);
      toast.error(error);
    }
  }, [error]);

  const handleStatusUpdate = async (newStatus) => {
    const success = await updateMissionStatus(newStatus);
    toast[success ? "success" : "error"](
      success
        ? `Mission status updated to ${newStatus}`
        : "Failed to update mission status"
    );
  };

  // Stat card component
  const StatCard = ({ label, value, children }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {children}
      </div>
    </div>
  );

  // Mission detail row component
  const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (!missionData) {
    return (
      <div className="text-center p-4">
        <h2 className="font-bold text-red-500 mb-4">Mission Not Found</h2>
        <p className="text-gray-600 mb-4">
          Unable to find mission with ID: {id}
        </p>
        <button
          onClick={() => navigate("/missions")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Missions
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/missions")}
            className="p-1.5 hover:bg-gray-100 rounded-md"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-base font-medium text-gray-900">
            {missionData?.name}
          </span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(
              missionData?.status
            )}`}
          >
            {missionData?.status}
          </span>
        </div>
        <MissionControls
          status={missionData?.status}
          onStart={() => {
            handleStatusUpdate("in-progress");
            startSimulation();
          }}
          onPause={pauseMission}
          onAbort={abortMission}
          onComplete={() => handleStatusUpdate("completed")}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Map */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
            <div className="w-full h-[450px] overflow-hidden">
              <MapComponent
                waypoints={missionData?.waypoints || []}
                isMonitoring
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Stats and Details */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Progress" value={`${missionData?.progress || 0}%`}>
              <ProgressBar value={missionData?.progress} />
            </StatCard>
            <StatCard
              label="Battery"
              value={`${missionData?.droneBattery || 0}%`}
            >
              <ProgressBar
                value={missionData?.droneBattery}
                color={
                  (missionData?.droneBattery || 0) > 20
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              />
            </StatCard>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Mission Details
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <DetailRow
                label="Area Coverage"
                value={`${missionData?.area} m²`}
              />
              <DetailRow
                label="Signal Strength"
                value={
                  <div className="flex items-center gap-2">
                    <span>{missionData?.signalStrength}%</span>
                    <ProgressBar value={missionData?.signalStrength} />
                  </div>
                }
              />
              <DetailRow
                label="Start Time"
                value={
                  missionData?.startDate
                    ? new Date(missionData.startDate).toLocaleString()
                    : "N/A"
                }
              />
              <DetailRow
                label="Estimated End"
                value={
                  missionData?.endDate
                    ? new Date(missionData.endDate).toLocaleString()
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionMonitoring;
