import { useEffect, useState, useCallback, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const MapComponent = ({
  waypoints = [],
  isMonitoring = false,
  readOnly = false,
}) => {
  const defaultCenter = [18.5204, 73.8567]; // Default center if no waypoints

  const validateWaypoint = (waypoint) => {
    if (!Array.isArray(waypoint) || waypoint.length !== 2) return false;
    const [lat, lng] = waypoint;
    return (
      typeof lat === "number" &&
      typeof lng === "number" &&
      !isNaN(lat) &&
      !isNaN(lng)
    );
  };

  const validWaypoints = waypoints.filter(validateWaypoint);

  const getCenter = () => {
    if (validWaypoints.length === 0) return defaultCenter;
    const lats = validWaypoints.map((wp) => wp[0]);
    const lngs = validWaypoints.map((wp) => wp[1]);
    return [
      (Math.min(...lats) + Math.max(...lats)) / 2,
      (Math.min(...lngs) + Math.max(...lngs)) / 2,
    ];
  };

  return (
    <div className="h-[600px] w-full relative">
      <MapContainer
        center={getCenter()}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {validWaypoints.map((position, idx) => (
          <Marker
            key={`waypoint-${idx}`}
            position={position}
            draggable={!readOnly}
          >
            {/* Marker content can be added here */}
          </Marker>
        ))}

        {validWaypoints.length > 1 && (
          <Polyline
            positions={validWaypoints}
            color={isMonitoring ? "blue" : "red"}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
