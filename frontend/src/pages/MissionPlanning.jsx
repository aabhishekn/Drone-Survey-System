import { useState, useEffect } from "react";

const MissionPlanning = () => {
  const [step, setStep] = useState(1);
  const [availableDrones, setAvailableDrones] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [missionData, setMissionData] = useState({
    name: "",
    description: "",
    area: "",
    startDate: "",
    endDate: "",
    isRecurring: false,
    recurringInterval: "weekly",
    selectedDrones: [],
    waypoints: [],
    altitude: 120, // in meters
    speed: 15, // in m/s
    sensors: {
      camera: true,
      thermal: false,
      lidar: false,
    },
    dataCollection: {
      captureInterval: 5, // in seconds
      overlapPercentage: 60, // front and side overlap
    },
  });

  useEffect(() => {
    // Simulate API fetch for available drones
    setTimeout(() => {
      setAvailableDrones([
        { id: 1, name: "Alpha-1", model: "DJI Mavic 3", batteryLevel: 87 },
        { id: 4, name: "Delta-4", model: "Skydio 2", batteryLevel: 92 },
        { id: 5, name: "Epsilon-5", model: "DJI Mavic 3", batteryLevel: 95 },
        { id: 6, name: "Zeta-6", model: "Autel EVO II", batteryLevel: 88 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMissionData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSensorChange = (sensor) => {
    setMissionData((prev) => ({
      ...prev,
      sensors: {
        ...prev.sensors,
        [sensor]: !prev.sensors[sensor],
      },
    }));
  };

  const handleDataCollectionChange = (field, value) => {
    setMissionData((prev) => ({
      ...prev,
      dataCollection: {
        ...prev.dataCollection,
        [field]: value,
      },
    }));
  };

  const handleDroneToggle = (droneId) => {
    setMissionData((prev) => {
      const isSelected = prev.selectedDrones.includes(droneId);
      return {
        ...prev,
        selectedDrones: isSelected
          ? prev.selectedDrones.filter((id) => id !== droneId)
          : [...prev.selectedDrones, droneId],
      };
    });
  };

  const addWaypoint = () => {
    // In a real application, this would integrate with a map to select coordinates
    const newWaypoint = {
      id: Date.now(), // simple ID for demo
      lat: Math.random() * 0.1 + 37.7, // Random latitude around San Francisco for demo
      lng: Math.random() * 0.1 - 122.4, // Random longitude around San Francisco for demo
      action: "capture", // Default action
    };

    setMissionData((prev) => ({
      ...prev,
      waypoints: [...prev.waypoints, newWaypoint],
    }));
  };

  const removeWaypoint = (waypointId) => {
    setMissionData((prev) => ({
      ...prev,
      waypoints: prev.waypoints.filter((wp) => wp.id !== waypointId),
    }));
  };

  const handleNextStep = () => {
    setStep((current) => current + 1);
  };

  const handlePrevStep = () => {
    setStep((current) => current - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log("Submitting mission data:", missionData);
    alert("Mission created successfully!");
    // Reset form or redirect
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Mission Planning</h1>
        <p className="text-gray-600">
          Design and schedule drone survey missions
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center w-full mb-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-300"
            } shrink-0`}
          >
            1
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              step >= 2 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-300"
            } shrink-0`}
          >
            2
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${
              step >= 3 ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-300"
            } shrink-0`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className={step >= 1 ? "text-blue-600 font-medium" : ""}>
            Mission Details
          </div>
          <div className={step >= 2 ? "text-blue-600 font-medium" : ""}>
            Drone Selection
          </div>
          <div className={step >= 3 ? "text-blue-600 font-medium" : ""}>
            Flight Parameters
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {/* Step 1: Mission Details */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Mission Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mission Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={missionData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Survey Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={missionData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={missionData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={missionData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={missionData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isRecurring"
                name="isRecurring"
                checked={missionData.isRecurring}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isRecurring"
                className="ml-2 block text-sm text-gray-700"
              >
                Recurring Mission
              </label>
            </div>

            {missionData.isRecurring && (
              <div>
                <label
                  htmlFor="recurringInterval"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Recurring Interval
                </label>
                <select
                  id="recurringInterval"
                  name="recurringInterval"
                  value={missionData.recurringInterval}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Drone Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select Drones</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDrones.map((drone) => (
                <div
                  key={drone.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    missionData.selectedDrones.includes(drone.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-200"
                  }`}
                  onClick={() => handleDroneToggle(drone.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{drone.name}</h3>
                      <p className="text-sm text-gray-600">{drone.model}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 text-sm font-medium">
                        {drone.batteryLevel}%
                      </div>
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            drone.batteryLevel > 70
                              ? "bg-green-500"
                              : drone.batteryLevel > 30
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${drone.batteryLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <div
                      className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                        missionData.selectedDrones.includes(drone.id)
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {missionData.selectedDrones.includes(drone.id) && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                disabled={missionData.selectedDrones.length === 0}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Flight Parameters */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Flight Parameters</h2>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-md font-medium mb-3">Waypoints</h3>
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  Add waypoints to define the flight path
                </p>
                <button
                  type="button"
                  onClick={addWaypoint}
                  className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Waypoint
                </button>
              </div>

              {missionData.waypoints.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Point
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lat
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lng
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {missionData.waypoints.map((waypoint, index) => (
                        <tr key={waypoint.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {waypoint.lat.toFixed(6)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {waypoint.lng.toFixed(6)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {waypoint.action}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => removeWaypoint(waypoint.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No waypoints added yet
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium mb-3">Flight Settings</h3>

                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="altitude"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Altitude (m)
                    </label>
                    <input
                      type="number"
                      id="altitude"
                      name="altitude"
                      min="30"
                      max="500"
                      value={missionData.altitude}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="speed"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Speed (m/s)
                    </label>
                    <input
                      type="number"
                      id="speed"
                      name="speed"
                      min="5"
                      max="30"
                      value={missionData.speed}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-3">
                  Sensors & Data Collection
                </h3>

                <div className="space-y-3">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="camera"
                        checked={missionData.sensors.camera}
                        onChange={() => handleSensorChange("camera")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="camera"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Camera
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="thermal"
                        checked={missionData.sensors.thermal}
                        onChange={() => handleSensorChange("thermal")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="thermal"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Thermal Imaging
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="lidar"
                        checked={missionData.sensors.lidar}
                        onChange={() => handleSensorChange("lidar")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="lidar"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        LiDAR
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="captureInterval"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Capture Interval (seconds)
                    </label>
                    <input
                      type="number"
                      id="captureInterval"
                      min="1"
                      max="60"
                      value={missionData.dataCollection.captureInterval}
                      onChange={(e) =>
                        handleDataCollectionChange(
                          "captureInterval",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="overlapPercentage"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Image Overlap (%)
                    </label>
                    <input
                      type="number"
                      id="overlapPercentage"
                      min="20"
                      max="90"
                      value={missionData.dataCollection.overlapPercentage}
                      onChange={(e) =>
                        handleDataCollectionChange(
                          "overlapPercentage",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Mission
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MissionPlanning;
