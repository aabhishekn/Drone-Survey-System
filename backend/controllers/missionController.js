// Importing the Mission model
// const Mission = require('../models/Mission');

// Mock data for demos
const missions = [
  {
    id: 101,
    name: "Factory South Perimeter",
    status: "completed",
    date: "2023-03-15",
    area: "South Building",
    drones: ["Alpha-1"],
    progress: 100,
  },
  {
    id: 102,
    name: "North Campus Survey",
    status: "in-progress",
    date: "2023-03-28",
    area: "North Campus",
    drones: ["Beta-2"],
    progress: 68,
    estimatedTimeRemaining: "24 minutes",
    currentCoordinates: {
      lat: 37.785,
      lng: -122.406,
    },
  },
  {
    id: 103,
    name: "Warehouse Roof Inspection",
    status: "scheduled",
    date: "2023-04-05",
    area: "Main Warehouse",
    drones: ["Delta-4"],
    progress: 0,
  },
  {
    id: 105,
    name: "East Building Inspection",
    status: "in-progress",
    date: "2023-03-29",
    area: "East Campus",
    drones: ["Gamma-3"],
    progress: 42,
    estimatedTimeRemaining: "35 minutes",
    currentCoordinates: {
      lat: 37.79,
      lng: -122.4,
    },
  },
];

// @desc    Get all missions
// @route   GET /api/missions
// @access  Public
exports.getMissions = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const missions = await Mission.find();

    // Filter by status if provided
    const filteredMissions = req.query.status
      ? missions.filter((m) => m.status === req.query.status)
      : missions;

    res.status(200).json({
      success: true,
      count: filteredMissions.length,
      data: filteredMissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single mission
// @route   GET /api/missions/:id
// @access  Public
exports.getMission = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const mission = await Mission.findById(req.params.id);
    const mission = missions.find((m) => m.id === parseInt(req.params.id));

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: mission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create a mission
// @route   POST /api/missions
// @access  Private
exports.createMission = async (req, res) => {
  try {
    // In a real app, this would save to database
    // const mission = await Mission.create(req.body);

    // Mock creation with ID assignment
    const newMission = {
      id: missions.length + 106, // Just to avoid ID conflicts with our mock data
      ...req.body,
      status: req.body.status || "scheduled",
      progress: req.body.progress || 0,
    };

    // For demo purposes we'll just acknowledge success
    // In a real app we would push to actual array and save to DB

    res.status(201).json({
      success: true,
      data: newMission,
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

// @desc    Update mission
// @route   PUT /api/missions/:id
// @access  Private
exports.updateMission = async (req, res) => {
  try {
    // In a real app, this would update in database
    // const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    const missionIndex = missions.findIndex(
      (m) => m.id === parseInt(req.params.id)
    );

    if (missionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

    // For demo purposes, we'll create an updated mission but not actually update our array
    const updatedMission = {
      ...missions[missionIndex],
      ...req.body,
    };

    res.status(200).json({
      success: true,
      data: updatedMission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Delete mission
// @route   DELETE /api/missions/:id
// @access  Private
exports.deleteMission = async (req, res) => {
  try {
    // In a real app, this would delete from database
    // const mission = await Mission.findById(req.params.id);

    const missionIndex = missions.findIndex(
      (m) => m.id === parseInt(req.params.id)
    );

    if (missionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

    // await mission.remove(); // In a real app

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

// @desc    Update mission status (special endpoint for actions like pause/resume/abort)
// @route   PATCH /api/missions/:id/status
// @access  Private
exports.updateMissionStatus = async (req, res) => {
  try {
    const { status, action } = req.body;

    if (!status && !action) {
      return res.status(400).json({
        success: false,
        error: "Status or action must be provided",
      });
    }

    const missionIndex = missions.findIndex(
      (m) => m.id === parseInt(req.params.id)
    );

    if (missionIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

    // Map action to status if action is provided
    let newStatus = status;
    if (action) {
      switch (action) {
        case "start":
          newStatus = "in-progress";
          break;
        case "pause":
          newStatus = "paused";
          break;
        case "resume":
          newStatus = "in-progress";
          break;
        case "abort":
          newStatus = "aborted";
          break;
        case "complete":
          newStatus = "completed";
          break;
        default:
          newStatus = status;
      }
    }

    // For demo purposes, we'll create an updated mission but not actually update our array
    const updatedMission = {
      ...missions[missionIndex],
      status: newStatus || missions[missionIndex].status,
      // Add a log entry for this status change in a real app
    };

    // Add event log entry (in a real app this would be saved to the database)
    const now = new Date();
    const eventMsg = `Mission ${action || "status updated to " + newStatus}`;

    res.status(200).json({
      success: true,
      data: updatedMission,
      message: eventMsg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
