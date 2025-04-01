export const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xleGFtcGxlLWtleSJ9.example-signature";

export const API_BASE_URL = "http://localhost:5005";

export const API_ENDPOINTS = {
  MISSIONS: "/api/v1/missions",
  MISSION_STATS: "/api/v1/missions/stats",
  DRONES: "/api/v1/drones",
  REPORTS: "/api/v1/reports",
};

export const DRONE_STATUS = {
  AVAILABLE: "available",
  IN_MISSION: "in-mission",
  MAINTENANCE: "maintenance",
};

export const MISSION_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

export const DEFAULT_MAP_CONFIG = {
  style: "mapbox://styles/mapbox/streets-v12",
  zoom: 14,
};
