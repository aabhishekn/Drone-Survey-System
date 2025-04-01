const express = require("express");
const router = express.Router();
const {
  getReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
  exportReports,
  clearReports,
} = require("../controllers/reportController");

router.route("/").get(getReports).post(createReport);

// Add before other routes
router.post("/clear", clearReports);

// Export route - place before /:id routes to avoid conflicts
router.get("/export/:format", exportReports);

router.route("/:id").get(getReport).put(updateReport).delete(deleteReport);

module.exports = router;
