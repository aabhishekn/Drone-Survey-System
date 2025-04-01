// Mock data to be inserted into SQLite tables

const drones = [
  {
    name: "Alpha-1",
    model: "DJI Mavic 3",
    status: "available",
    batteryLevel: 87,
    lastMission: "2023-03-15",
    capabilities: {
      camera: true,
      thermal: true,
      lidar: false,
    },
  },
  // ...existing mock drone data...
];

const missions = [
  {
    name: "Factory South Perimeter",
    status: "completed",
    startDate: "2023-03-15",
    area: "South Building",
    progress: 100,
    waypoints: [
      { lat: 37.782, lng: -122.409, action: "waypoint" },
      { lat: 37.783, lng: -122.408, action: "capture" },
    ],
  },
  // ...existing mock mission data...
];

const reports = [
  {
    name: "Factory South Perimeter",
    date: "2023-03-15",
    area: "South Building",
    duration: 45,
    distance: 2.4,
    coverage: 0.8,
    images: 145,
    status: "completed",
    findings: "No anomalies detected",
  },
  // ...existing mock report data...
];

const missionDrones = [
  {
    MissionId: 1,
    DroneId: 1,
  },
  {
    MissionId: 2,
    DroneId: 2,
  },
  {
    MissionId: 3,
    DroneId: 3,
  },
  {
    MissionId: 4,
    DroneId: 4,
  },
];

module.exports = {
  drones,
  missions,
  reports,
  missionDrones,
};
