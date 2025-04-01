// Importing the Mission model
const { Mission, Report, sequelize, Drone } = require("../models");
const { Op } = require("sequelize");

// @desc    Get all missions
// @route   GET /api/missions
// @access  Public
exports.getMissions = async (req, res) => {
  try {
    const missions = await Mission.findAll({
      where: req.query.status ? { status: req.query.status } : {},
    });

    res.status(200).json({
      success: true,
      count: missions.length,
      data: missions,
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
    const { id } = req.params;

    console.log(`[Mission Request] Attempting to fetch mission ID: ${id}`);

    // Validate mission ID format
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid mission ID format",
        code: "INVALID_MISSION_ID",
        details: "Mission ID must be a valid number",
      });
    }

    const mission = await Mission.findByPk(id);

    if (!mission) {
      console.log(`[Mission Not Found] Mission ${id} does not exist`);
      return res.status(404).json({
        success: false,
        error: `Mission ${id} not found`,
        code: "MISSION_NOT_FOUND",
        redirectTo: "/missions",
        suggestion: "Return to missions list and select an existing mission",
      });
    }

    // Add simulated telemetry data for monitoring
    const missionData = {
      ...mission.toJSON(),
      progress:
        mission.status === "completed"
          ? 100
          : mission.status === "in-progress"
          ? Math.floor(Math.random() * 100)
          : 0,
      droneBattery: Math.floor(Math.random() * (100 - 60) + 60),
      signalStrength: Math.floor(Math.random() * (100 - 80) + 80),
      flightParams: mission.flightParams || {
        altitude: 50,
        speed: 5,
      },
    };

    res.status(200).json({
      success: true,
      data: missionData,
    });
  } catch (error) {
    console.error("[Mission Error]", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch mission details",
      details: error.message,
      code: "SERVER_ERROR",
    });
  }
};

// @desc    Create a mission
// @route   POST /api/missions
// @access  Private
exports.createMission = async (req, res) => {
  try {
    const mission = await Mission.create({
      ...req.body,
      status: "scheduled",
    });

    res.status(201).json({
      success: true,
      data: mission,
    });
  } catch (error) {
    console.error("Error creating mission:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update mission
// @route   PUT /api/missions/:id
// @access  Private
exports.updateMission = async (req, res) => {
  try {
    const mission = await Mission.findByPk(req.params.id);

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

    await mission.update(req.body);

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

// @desc    Delete mission
// @route   DELETE /api/missions/:id
// @access  Private
exports.deleteMission = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const mission = await Mission.findByPk(req.params.id);

      if (!mission) {
        return res.status(404).json({
          success: false,
          error: "Mission not found",
        });
      }

      // Delete associated report within the same transaction
      await Report.destroy({
        where: {
          [Op.or]: [{ name: mission.name }, { name: `Mission ${mission.id}` }],
        },
        transaction: t,
      });

      // Delete the mission
      await mission.destroy({ transaction: t });
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Update mission status
// @route   PATCH /api/missions/:id/status
// @access  Private
exports.updateMissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, action } = req.body;

    const mission = await Mission.findByPk(id, {
      include: ["drone"], // Include drone details
    });

    if (!mission) {
      return res.status(404).json({
        success: false,
        error: "Mission not found",
      });
    }

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
      }
    }

    if (newStatus === "completed") {
      // Check if report already exists
      const existingReport = await Report.findOne({
        where: { name: mission.name },
      });

      if (!existingReport) {
        await Report.create({
          name: mission.name || `Mission ${id}`,
          date: new Date(),
          drone: mission.drone?.name || "Default Drone",
          area: parseFloat(mission.area) || 100,
          duration: parseInt(mission.duration) || 30,
          distance: parseFloat(mission.distance) || 2.5,
          images: 0,
          findings: "Mission completed successfully",
          month: new Date().toLocaleString("default", { month: "long" }),
          status: "completed",
        });
        console.log(`Created report for mission: ${mission.name}`);
      }
    }

    await mission.update({ status: newStatus });

    res.status(200).json({
      success: true,
      data: mission,
    });
  } catch (error) {
    console.error("Update mission status error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get mission statistics
// @route   GET /api/missions/stats
// @access  Private
exports.getMissionStats = async (req, res, next) => {
  try {
    const totalMissions = await Mission.count();
    const completedMissions = await Mission.count({
      where: {
        status: "completed",
      },
    });
    const pendingMissions = await Mission.count({
      where: {
        status: "scheduled",
      },
    });
    const inProgressMissions = await Mission.count({
      where: {
        status: "in-progress",
      },
    });
    const missionsByArea = await Mission.findAll({
      attributes: ["area", [sequelize.fn("COUNT", "*"), "count"]],
      group: ["area"],
      raw: true,
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalMissions,
        completed: completedMissions,
        pending: pendingMissions,
        inProgress: inProgressMissions,
        byArea: missionsByArea,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Error fetching mission statistics",
    });
  }
};

// @desc    Sync completed missions to reports
// @route   POST /api/missions/sync-reports
// @access  Private
exports.syncCompletedMissionsToReports = async (req, res) => {
  try {
    const completedMissions = await Mission.findAll({
      where: { status: "completed" },
      include: ["drone"],
    });

    console.log(`Found ${completedMissions.length} completed missions to sync`);
    let syncedCount = 0;

    for (const mission of completedMissions) {
      const existingReport = await Report.findOne({
        where: { name: mission.name },
      });

      if (!existingReport) {
        await Report.create({
          name: mission.name,
          date: new Date(),
          drone: mission.drone?.name || "Default Drone",
          area: parseFloat(mission.area) || 100,
          duration: parseInt(mission.duration) || 30,
          distance: parseFloat(mission.distance) || 2.5,
          findings: "Mission completed successfully",
          month: new Date().toLocaleString("default", { month: "long" }),
          status: "completed",
        });
        syncedCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Synced ${syncedCount} new reports from completed missions`,
    });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to sync missions to reports",
    });
  }
};
