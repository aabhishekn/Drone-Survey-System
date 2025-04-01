import { useState } from "react";
import { useDroneData } from "../hooks/useDroneData";
import { getStatusColor } from "../utils/statusHelpers";
import LoadingSpinner from "../components/common/LoadingSpinner";
import AddDroneModal from "../components/drones/AddDroneModal"; // Updated import path
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

const FleetManagement = () => {
  const { loading, error, droneData, setDroneData, refreshDrones } =
    useDroneData(); // Get refreshDrones from hook
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [droneToDelete, setDroneToDelete] = useState(null);

  const handleDroneAdded = async (newDrone) => {
    await refreshDrones(); // Refresh the list after adding
  };

  const handleDeleteDrone = async (e, droneId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this drone?")) {
      try {
        await api.delete(`${API_ENDPOINTS.DRONES}/${droneId}`);
        await refreshDrones(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting drone:", error);
        alert(`Failed to delete drone: ${error.message}`);
      }
    }
  };

  const handleDroneClick = (drone) => {
    setSelectedDrone(drone);
  };

  // Filter and search functionality
  const filteredDrones =
    droneData?.filter((drone) => {
      const matchesStatus =
        filterStatus === "all" || drone.status === filterStatus;
      const matchesSearch =
        drone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drone.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Drone Management</h1>
        <button
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md hover:shadow-lg flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <svg
            className="w-5 h-5"
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
          Add New Drone
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search drones..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 min-w-[160px]"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="in-mission">In Mission</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Drones Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500 p-8 text-center">{error}</div>
        ) : filteredDrones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Model", "Status", "Battery", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredDrones.map((drone) => (
                  <tr
                    key={drone.id}
                    className="hover:bg-gray-50 transition duration-150 cursor-pointer"
                    onClick={() => handleDroneClick(drone)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {drone.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {drone.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`${getStatusColor(
                          drone.status
                        )} px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {drone.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              drone.batteryLevel > 20
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${drone.batteryLevel}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {drone.batteryLevel}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={(e) => handleDeleteDrone(e, drone.id)}
                        className="text-red-600 hover:text-red-900 font-medium hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No drones found. Add a drone to get started.
            </p>
          </div>
        )}
      </div>

      {/* Drone Detail Modal */}
      {selectedDrone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedDrone(null)}
              className="absolute top-4 right-4"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-4">
              {/* Detailed drone information */}
              <h2 className="text-2xl font-bold mb-4">{selectedDrone.name}</h2>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {droneToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this drone?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDroneToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <AddDroneModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDroneAdded={handleDroneAdded}
      />
    </div>
  );
};

export default FleetManagement;
