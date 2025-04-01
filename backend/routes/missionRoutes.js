const express = require("express");
const router = express.Router();
const { Mission } = require("../models");
const { Op } = require("sequelize");
const missionController = require("../controllers/missionController");

// Get all missions
router.get("/", async (req, res) => {
  try {
    const missions = await Mission.findAll();
    res.json({ success: true, data: missions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new mission with validation
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      startDate, // Changed from startDateTime
      endDate, // Changed from endDateTime
      flightParams,
      waypoints,
    } = req.body;

    // Validate required fields
    if (!name || !startDate || !endDate || !flightParams || !waypoints) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        requiredFields: {
          name: !name,
          startDate: !startDate,
          endDate: !endDate,
          flightParams: !flightParams,
          waypoints: !waypoints,
        },
      });
    }

    // Validate waypoints
    if (!Array.isArray(waypoints) || waypoints.length < 2) {
      return res.status(400).json({
        success: false,
        error: "At least 2 waypoints are required",
      });
    }

    const mission = await Mission.create({
      ...req.body,
      createdAt: new Date().toISOString(),
      status: "scheduled",
    });

    res.status(201).json({
      success: true,
      data: mission,
      message: "Mission created successfully",
    });
  } catch (error) {
    console.error("Error creating mission:", error);
    res.status(400).json({
      success: false,
      error: error.message,
      payload: req.body, // Add this for debugging
      details: error?.errors?.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }
});

// Move stats route before any routes with parameters
router.get("/stats", missionController.getMissionStats);

// Other routes with parameters
router.get("/:id", missionController.getMission);
router.put("/:id", missionController.updateMission);

// Delete mission
router.delete("/:id", async (req, res) => {
  try {
    const missionId = req.params.id;
    const mission = await Mission.findByPk(missionId);

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: `Mission with ID ${missionId} not found`,
      });
    }

    await mission.destroy();

    res.json({
      success: true,
      message: `Mission ${missionId} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting mission:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to delete mission",
    });
  }
});

function calculateTotalFlightHours(missions) {
  const totalMinutes = missions.reduce((acc, mission) => {
    if (mission.startDate && mission.endDate) {
      const duration = new Date(mission.endDate) - new Date(mission.startDate);
      return acc + duration / (1000 * 60); // Convert to minutes
    }
    return acc;
  }, 0);
  return Math.round((totalMinutes / 60) * 100) / 100; // Convert to hours with 2 decimal places
}

function calculateSuccessRate(missions) {
  if (!missions.length) return 0;
  const completed = missions.filter((m) => m.status === "completed").length;
  return Math.round((completed / missions.length) * 100);
}

function calculateTotalDistance(missions) {
  const totalMeters = missions.reduce((acc, mission) => {
    // Assuming flightParams contains distance or calculate from waypoints
    const distance = mission.flightParams?.distance || 0;
    return acc + distance;
  }, 0);
  return Math.round((totalMeters / 1000) * 100) / 100; // Convert to km with 2 decimal places
}

function calculateMonthlyStats(missions) {
  const monthlyStats = {};

  missions.forEach((mission) => {
    const date = new Date(mission.startDate);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!monthlyStats[monthKey]) {
      monthlyStats[monthKey] = { completed: 0, failed: 0 };
    }

    if (mission.status === "completed") {
      monthlyStats[monthKey].completed++;
    } else if (mission.status === "aborted" || mission.status === "cancelled") {
      monthlyStats[monthKey].failed++;
    }
  });

  return Object.entries(monthlyStats)
    .map(([key, value]) => ({
      month: new Date(key).toLocaleString("default", { month: "short" }),
      ...value,
    }))
    .sort((a, b) => new Date(a.key) - new Date(b.key));
}

module.exports = router;
