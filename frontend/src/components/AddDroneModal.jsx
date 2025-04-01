import { useState } from "react";
import api from "../services/api";
import { API_ENDPOINTS } from "../utils/constants";

const AddDroneModal = ({ isOpen, onClose, onDroneAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    status: "available",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting to:", API_ENDPOINTS.DRONES);
      const response = await api.post(API_ENDPOINTS.DRONES, formData);

      // Check for both response formats
      const newDrone = response?.data?.data || response?.data;

      if (newDrone) {
        setFormData({
          name: "",
          model: "",
          status: "available",
        });
        onDroneAdded(newDrone);
        onClose();
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error adding drone:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Server not responding. Please check if the backend server is running.";

      alert(`Failed to add drone: ${errorMessage}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Drone</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Drone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDroneModal;
