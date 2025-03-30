const express = require("express");
const router = express.Router();
const {
  getMissions,
  getMission,
  createMission,
  updateMission,
  deleteMission,
  updateMissionStatus,
} = require("../controllers/missionController");

router.route("/").get(getMissions).post(createMission);

router.route("/:id").get(getMission).put(updateMission).delete(deleteMission);

router.route("/:id/status").patch(updateMissionStatus);

module.exports = router;
