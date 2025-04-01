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

// Fix for marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

const MapEvents = ({ onWaypointAdd }) => {
  const map = useMap();
  const addWaypointRef = useRef(onWaypointAdd);

  useEffect(() => {
    addWaypointRef.current = onWaypointAdd;
  }, [onWaypointAdd]);

  useEffect(() => {
    const handleClick = (e) => {
      addWaypointRef.current([e.latlng.lat, e.latlng.lng]);
    };

    map.on("click", handleClick);
    return () => map.off("click", handleClick);
  }, [map]);

  return null;
};

const Map = ({ onWaypointsChange }) => {
  const defaultCenter = [18.5204, 73.8567];
  const [waypoints, setWaypoints] = useState([]);
  const waypointsRef = useRef(waypoints);

  useEffect(() => {
    waypointsRef.current = waypoints;
  }, [waypoints]);

  const handleAddWaypoint = useCallback(
    (newWaypoint) => {
      const updatedWaypoints = [...waypointsRef.current, newWaypoint];
      setWaypoints(updatedWaypoints);
      onWaypointsChange?.(updatedWaypoints);
    },
    [onWaypointsChange]
  );

  const handleRemoveWaypoint = useCallback(
    (index) => {
      const updatedWaypoints = waypointsRef.current.filter(
        (_, i) => i !== index
      );
      setWaypoints(updatedWaypoints);
      onWaypointsChange?.(updatedWaypoints);
    },
    [onWaypointsChange]
  );

  return (
    <div className="h-[600px] w-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {waypoints.map((position, idx) => (
          <Marker
            key={idx}
            position={position}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                handleRemoveWaypoint(idx);
              },
            }}
          />
        ))}

        {waypoints.length > 1 && (
          <Polyline
            positions={waypoints}
            color="blue"
            weight={2}
            opacity={0.7}
          />
        )}

        <MapEvents onWaypointAdd={handleAddWaypoint} />
      </MapContainer>

      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 bg-opacity-90 p-2 rounded-b text-sm text-gray-600">
        Click to add waypoints. Click on a waypoint to remove it.
      </div>
    </div>
  );
};

export default Map;
