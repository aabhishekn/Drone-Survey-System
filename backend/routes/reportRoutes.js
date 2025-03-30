const express = require("express");
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

router.route("/").get(getReports).post(createReport);

router.route("/:id").get(getReport).put(updateReport).delete(deleteReport);

module.exports = router;
