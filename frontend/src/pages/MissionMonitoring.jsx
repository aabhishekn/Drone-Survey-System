import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Note: You need to sign up for a Mapbox account and get an access token
// Replace with your own access token in a real application
mapboxgl.accessToken =
  "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xleGFtcGxlLWtleSJ9.example-signature";

const MissionMonitoring = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeMissions, setActiveMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock data for active missions
  const mockMissions = [
    {
      id: 102,
      name: "North Campus Survey",
      status: "in-progress",
      progress: 68,
      estimatedTimeRemaining: "24 minutes",
      startTime: "09:30 AM",
      drone: {
        id: 2,
        name: "Beta-2",
        batteryLevel: 62,
        speed: 12.5,
        altitude: 120,
      },
      currentCoordinates: {
        lat: 37.785,
        lng: -122.406,
      },
      pathCoordinates: [
        [37.782, -122.409],
        [37.783, -122.408],
        [37.784, -122.407],
        [37.785, -122.406],
        [37.786, -122.405],
        [37.787, -122.404],
      ],
      events: [
        { id: 1, time: "09:30 AM", message: "Mission started" },
        { id: 2, time: "09:45 AM", message: "Reached waypoint 2" },
        {
          id: 3,
          time: "10:05 AM",
          message: "Reached waypoint 3, collecting data",
        },
        {
          id: 4,
          time: "10:20 AM",
          message: "Detected high winds, adjusting altitude",
        },
      ],
    },
    {
      id: 105,
      name: "East Building Inspection",
      status: "in-progress",
      progress: 42,
      estimatedTimeRemaining: "35 minutes",
      startTime: "10:15 AM",
      drone: {
        id: 3,
        name: "Gamma-3",
        batteryLevel: 78,
        speed: 10.2,
        altitude: 90,
      },
      currentCoordinates: {
        lat: 37.79,
        lng: -122.4,
      },
      pathCoordinates: [
        [37.788, -122.402],
        [37.789, -122.401],
        [37.79, -122.4],
        [37.791, -122.399],
        [37.792, -122.398],
      ],
      events: [
        { id: 1, time: "10:15 AM", message: "Mission started" },
        {
          id: 2,
          time: "10:25 AM",
          message: "Started building inspection sequence",
        },
        { id: 3, time: "10:45 AM", message: "Completed north facade" },
      ],
    },
  ];

  useEffect(() => {
    // Simulate loading mission data
    setTimeout(() => {
      setActiveMissions(mockMissions);
      setSelectedMission(mockMissions[0]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (loading) return;

    if (map.current) return; // only initialize map once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [
        selectedMission.currentCoordinates.lng,
        selectedMission.currentCoordinates.lat,
      ],
      zoom: 14,
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [loading, selectedMission]);

  // Add drone markers and flight paths to the map
  useEffect(() => {
    if (!mapLoaded || !map.current || !selectedMission) return;

    // Clear existing layers and sources
    if (map.current.getSource("route")) {
      map.current.removeLayer("route-layer");
      map.current.removeSource("route");
    }

    if (map.current.getSource("drone")) {
      map.current.removeLayer("drone-layer");
      map.current.removeSource("drone");
    }

    // Add the drone path (line)
    const pathFeature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: selectedMission.pathCoordinates.map((coord) => [
          coord[1],
          coord[0],
        ]),
      },
    };

    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [pathFeature],
      },
    });

    map.current.addLayer({
      id: "route-layer",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3b82f6",
        "line-width": 3,
        "line-dasharray": [0, 2],
      },
    });

    // Add the drone position marker
    map.current.addSource("drone", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [
            selectedMission.currentCoordinates.lng,
            selectedMission.currentCoordinates.lat,
          ],
        },
      },
    });

    map.current.addLayer({
      id: "drone-layer",
      type: "symbol",
      source: "drone",
      layout: {
        "icon-image": "airport",
        "icon-size": 1.5,
        "icon-allow-overlap": true,
        "icon-rotate": 45,
      },
    });

    // Center the map on the drone position
    map.current.flyTo({
      center: [
        selectedMission.currentCoordinates.lng,
        selectedMission.currentCoordinates.lat,
      ],
      zoom: 14,
      speed: 0.8,
    });
  }, [mapLoaded, selectedMission]);

  const handleMissionSelect = (missionId) => {
    const mission = activeMissions.find((m) => m.id === missionId);
    setSelectedMission(mission);
  };

  const handleMissionAction = (action) => {
    // In a real app, this would call an API to control the drone
    alert(`${action} command sent to drone ${selectedMission.drone.name}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Mission Monitoring</h1>
        <div className="flex space-x-2">
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMission ? selectedMission.id : ""}
            onChange={(e) => handleMissionSelect(parseInt(e.target.value))}
          >
            {activeMissions.map((mission) => (
              <option key={mission.id} value={mission.id}>
                {mission.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map and Status - Takes up 3/4 of the grid on larger screens */}
        <div className="lg:col-span-3 space-y-6">
          {/* Map Container */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96" ref={mapContainer}></div>
          </div>

          {/* Mission Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedMission.name}
                </h2>
                <div className="flex items-center mt-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedMission.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : selectedMission.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedMission.status === "in-progress"
                      ? "In Progress"
                      : selectedMission.status === "completed"
                      ? "Completed"
                      : "Scheduled"}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    Started at {selectedMission.startTime}
                  </span>
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleMissionAction("pause")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Pause
                </button>
                <button
                  onClick={() => handleMissionAction("resume")}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  Resume
                </button>
                <button
                  onClick={() => handleMissionAction("abort")}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Abort
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Mission Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${selectedMission.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span>{selectedMission.progress}% Complete</span>
                <span>
                  Est. time remaining: {selectedMission.estimatedTimeRemaining}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Drone
                </h4>
                <p className="font-medium">{selectedMission.drone.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Battery
                </h4>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className={`h-2 rounded-full ${
                        selectedMission.drone.batteryLevel > 70
                          ? "bg-green-500"
                          : selectedMission.drone.batteryLevel > 30
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${selectedMission.drone.batteryLevel}%`,
                      }}
                    ></div>
                  </div>
                  <span>{selectedMission.drone.batteryLevel}%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Flight Data
                </h4>
                <div className="text-sm">
                  <div>Altitude: {selectedMission.drone.altitude}m</div>
                  <div>Speed: {selectedMission.drone.speed}m/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Log - Takes up 1/4 of the grid on larger screens */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Event Log</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedMission.events.map((event) => (
                <div
                  key={event.id}
                  className="border-l-2 border-blue-500 pl-3 py-1"
                >
                  <div className="text-xs text-gray-500">{event.time}</div>
                  <div className="mt-1">{event.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionMonitoring;
