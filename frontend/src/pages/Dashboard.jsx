import { Link } from "react-router-dom";
import { useDroneData } from "../hooks/useDroneData";
import { useMissionData } from "../hooks/useMissionData";
import { getStatusColor } from "../utils/statusHelpers";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Dashboard = () => {
  const {
    loading: dronesLoading,
    error: dronesError,
    droneData: dronesResponse,
  } = useDroneData();

  const {
    loading: missionsLoading,
    error: missionsError,
    missionData: missions,
  } = useMissionData();

  // Error handling
  if (dronesError || missionsError) {
    return (
      <div className="text-red-500">Error: {dronesError || missionsError}</div>
    );
  }

  if (dronesLoading || missionsLoading) {
    return <LoadingSpinner />;
  }

  // Extract drones array from response
  const drones = Array.isArray(dronesResponse?.data)
    ? dronesResponse.data
    : Array.isArray(dronesResponse)
    ? dronesResponse
    : [];

  // Calculate statistics
  const availableDrones = drones.filter(
    (drone) => drone.status === "available"
  ).length;
  const inMissionDrones = drones.filter(
    (drone) => drone.status === "in-mission"
  ).length;
  const maintenanceDrones = drones.filter(
    (drone) => drone.status === "maintenance"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Mission Control
              </h1>
              <p className="text-sm text-gray-600">
                Monitor and manage your drone operations
              </p>
            </div>
          </div>
          <Link
            to="/mission-planning"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
          >
            <svg
              className="w-4 h-4 mr-1.5"
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
            Plan New Mission
          </Link>
        </div>

        {/* Summary Cards Grid - Reduced gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white backdrop-blur-lg rounded-xl shadow-sm p-5 border border-gray-100 transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                Drones
              </h2>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-4xl font-bold text-blue-600">
                {drones.length}
              </span>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                  <span className="text-gray-600">
                    Available: {availableDrones}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                  <span className="text-gray-600">
                    In Mission: {inMissionDrones}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                  <span className="text-gray-600">
                    Maintenance: {maintenanceDrones}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white backdrop-blur-lg rounded-xl shadow-sm p-5 border border-gray-100 transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h11M9 21V3m0 0L3 10m6-7l6 7"
                  />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                Active Missions
              </h2>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-4">
              {missions?.filter((m) => m.status === "in-progress").length || 0}
            </div>
            <div className="text-sm space-y-1">
              <div className="text-gray-600">
                {missions?.filter((m) => m.status === "planned").length || 0}{" "}
                scheduled
              </div>
              <div className="text-gray-600">
                {missions?.filter((m) => m.status === "completed").length || 0}{" "}
                completed
              </div>
            </div>
          </div>

          <div className="bg-white backdrop-blur-lg rounded-xl shadow-sm p-5 border border-gray-100 transform hover:scale-102 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h11M9 21V3m0 0L3 10m6-7l6 7"
                  />
                </svg>
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                Coverage Area
              </h2>
            </div>
            <div className="text-4xl font-bold text-green-600 mb-4">
              {(
                missions?.reduce((acc, m) => acc + (m.area || 0), 0) / 1000000
              ).toFixed(2)}{" "}
              km²
            </div>
            <div className="text-sm space-y-1">
              <div className="text-gray-600">
                {missions?.length || 0} total missions
              </div>
              <div className="text-gray-600">
                Across {new Set(missions?.map((m) => m.location)).size || 0}{" "}
                locations
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Drones Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Drone Status
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Drone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Battery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Mission
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drones.map((drone) => (
                  <tr key={drone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {drone.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {drone.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          drone.status
                        )} text-white`}
                      >
                        {drone.status.charAt(0).toUpperCase() +
                          drone.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${
                              drone.batteryLevel > 70
                                ? "bg-green-500"
                                : drone.batteryLevel > 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${drone.batteryLevel}%` }}
                          ></div>
                        </div>
                        <span>{drone.batteryLevel}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {drone.lastMission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Recent Missions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Missions
            </h2>
            <Link
              to="/missions"
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {missions && missions.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mission Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {missions.slice(0, 5).map((mission) => (
                    <tr key={mission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/mission-monitoring/${mission.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {mission.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            mission.status
                          )}`}
                        >
                          {mission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(mission.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mission.area} m²
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No missions available.
                <Link
                  to="/mission-planning"
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  Create your first mission
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
