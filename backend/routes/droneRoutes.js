const express = require("express");
const router = express.Router();
const {
  getDrones,
  getDrone,
  createDrone,
  updateDrone,
  deleteDrone,
} = require("../controllers/droneController");

router.route("/").get(getDrones).post(createDrone);

router.route("/:id").get(getDrone).put(updateDrone).delete(deleteDrone);

module.exports = router;
