import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in a real app, this would come from API
  const [droneData, setDroneData] = useState([]);
  const [missionData, setMissionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with mock data
    setTimeout(() => {
      setDroneData([
        {
          id: 1,
          name: "Alpha-1",
          model: "DJI Mavic 3",
          status: "available",
          batteryLevel: 87,
          lastMission: "2023-03-15",
        },
        {
          id: 2,
          name: "Beta-2",
          model: "DJI Phantom 4",
          status: "in-mission",
          batteryLevel: 62,
          lastMission: "2023-03-28",
        },
        {
          id: 3,
          name: "Gamma-3",
          model: "Autel EVO II",
          status: "maintenance",
          batteryLevel: 45,
          lastMission: "2023-03-20",
        },
        {
          id: 4,
          name: "Delta-4",
          model: "Skydio 2",
          status: "available",
          batteryLevel: 92,
          lastMission: "2023-03-10",
        },
      ]);

      setMissionData([
        {
          id: 101,
          name: "Factory South Perimeter",
          status: "completed",
          date: "2023-03-15",
          area: "South Building",
          drones: ["Alpha-1"],
        },
        {
          id: 102,
          name: "North Campus Survey",
          status: "in-progress",
          date: "2023-03-28",
          area: "North Campus",
          drones: ["Beta-2"],
        },
        {
          id: 103,
          name: "Warehouse Roof Inspection",
          status: "scheduled",
          date: "2023-04-05",
          area: "Main Warehouse",
          drones: ["Delta-4"],
        },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "in-mission":
        return "bg-blue-500";
      case "maintenance":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "scheduled":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <div className="flex space-x-2">
          <Link
            to="/mission-planning"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Plan New Mission
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Drone Fleet</h2>
          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold">{droneData.length}</span>
            <div className="flex flex-col text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>
                  Available:{" "}
                  {droneData.filter((d) => d.status === "available").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>
                  In Mission:{" "}
                  {droneData.filter((d) => d.status === "in-mission").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span>
                  Maintenance:{" "}
                  {droneData.filter((d) => d.status === "maintenance").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Active Missions</h2>
          <div className="text-3xl font-bold mb-2">
            {missionData.filter((m) => m.status === "in-progress").length}
          </div>
          <div className="text-sm">
            <div>
              {missionData.filter((m) => m.status === "scheduled").length}{" "}
              scheduled
            </div>
            <div>
              {missionData.filter((m) => m.status === "completed").length}{" "}
              completed this month
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Coverage Area</h2>
          <div className="text-3xl font-bold mb-2">324.5 km²</div>
          <div className="text-sm">
            <div>12 different locations</div>
            <div>+5.8% from last month</div>
          </div>
        </div>
      </div>

      {/* Drones Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Drone Fleet Status</h2>
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
              {droneData.map((drone) => (
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

      {/* Recent Missions */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Missions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missionData.map((mission) => (
                <tr key={mission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {mission.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mission.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        mission.status
                      )} text-white`}
                    >
                      {mission.status.charAt(0).toUpperCase() +
                        mission.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mission.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {mission.drones.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
