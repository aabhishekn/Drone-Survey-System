// Importing the Drone model
// const Drone = require('../models/Drone');

// Mock data for demos
const drones = [
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
];

// @desc    Get all drones
// @route   GET /api/drones
// @access  Public
exports.getDrones = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const drones = await Drone.find();
    res.status(200).json({
      success: true,
      count: drones.length,
      data: drones,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single drone
// @route   GET /api/drones/:id
// @access  Public
exports.getDrone = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const drone = await Drone.findById(req.params.id);
    const drone = drones.find((d) => d.id === parseInt(req.params.id));

    if (!drone) {
      return res.status(404).json({
        success: false,
        error: "Drone not found",
      });
    }

    res.status(200).json({
      success: true,
      data: drone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create a drone
// @route   POST /api/drones
// @access  Private
exports.createDrone = async (req, res) => {
  try {
    // In a real app, this would save to database
    // const drone = await Drone.create(req.body);

    // Mock creation with ID assignment
    const newDrone = {
      id: drones.length + 1,
      ...req.body,
      status: req.body.status || "available",
      batteryLevel: req.body.batteryLevel || 100,
      lastMission: req.body.lastMission || null,
    };

    // For demo purposes we'll just acknowledge success
    // In a real app we would push to actual array and save to DB

    res.status(201).json({
      success: true,
      data: newDrone,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Update drone
// @route   PUT /api/drones/:id
// @access  Private
exports.updateDrone = async (req, res) => {
  try {
    // In a real app, this would update in database
    // const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    const droneIndex = drones.findIndex(
      (d) => d.id === parseInt(req.params.id)
    );

    if (droneIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Drone not found",
      });
    }

    // For demo purposes, we'll create an updated drone but not actually update our array
    const updatedDrone = {
      ...drones[droneIndex],
      ...req.body,
    };

    res.status(200).json({
      success: true,
      data: updatedDrone,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Delete drone
// @route   DELETE /api/drones/:id
// @access  Private
exports.deleteDrone = async (req, res) => {
  try {
    // In a real app, this would delete from database
    // const drone = await Drone.findById(req.params.id);

    const droneIndex = drones.findIndex(
      (d) => d.id === parseInt(req.params.id)
    );

    if (droneIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Drone not found",
      });
    }

    // await drone.remove(); // In a real app

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
