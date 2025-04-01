const { Drone } = require("../models");

// Get all drones
exports.getDrones = async (req, res) => {
  try {
    const drones = await Drone.findAll();
    res.json({ success: true, data: drones });
  } catch (error) {
    console.error("Error fetching drones:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single drone
exports.getDrone = async (req, res) => {
  try {
    const drone = await Drone.findByPk(req.params.id);
    if (!drone) {
      return res.status(404).json({ success: false, error: "Drone not found" });
    }
    res.json({ success: true, data: drone });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create drone
exports.createDrone = async (req, res) => {
  try {
    const drone = await Drone.create(req.body);
    res.status(201).json({ success: true, data: drone });
  } catch (error) {
    console.error("Error creating drone:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update drone
exports.updateDrone = async (req, res) => {
  try {
    const drone = await Drone.findByPk(req.params.id);
    if (!drone) {
      return res.status(404).json({ success: false, error: "Drone not found" });
    }
    await drone.update(req.body);
    res.json({ success: true, data: drone });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete drone
exports.deleteDrone = async (req, res) => {
  try {
    const drone = await Drone.findByPk(req.params.id);
    if (!drone) {
      return res.status(404).json({ success: false, error: "Drone not found" });
    }
    await drone.destroy();
    res.json({ success: true, message: "Drone deleted successfully" });
  } catch (error) {
    console.error("Error deleting drone:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
