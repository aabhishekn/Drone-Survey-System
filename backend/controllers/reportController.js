// Importing the Report model
// const Report = require('../models/Report');

// Mock data for demos
const reports = [
  {
    id: 201,
    missionId: 101,
    name: "Factory South Perimeter",
    date: "2023-03-15",
    month: "March",
    drone: "Alpha-1",
    area: "South Building",
    duration: "45 minutes",
    distance: "2.4 km",
    coverage: "0.8 km²",
    images: 145,
    status: "completed",
    findings: "No anomalies detected",
  },
  {
    id: 202,
    missionId: 98,
    name: "North Campus Monthly",
    date: "2023-03-08",
    month: "March",
    drone: "Delta-4",
    area: "North Campus",
    duration: "72 minutes",
    distance: "3.7 km",
    coverage: "1.2 km²",
    images: 218,
    status: "completed",
    findings: "Vegetation encroachment on east side",
  },
  {
    id: 203,
    missionId: 95,
    name: "Warehouse Roof Inspection",
    date: "2023-03-01",
    month: "March",
    drone: "Beta-2",
    area: "Main Warehouse",
    duration: "34 minutes",
    distance: "1.2 km",
    coverage: "0.3 km²",
    images: 89,
    status: "completed",
    findings: "Possible drainage issue identified",
  },
  {
    id: 204,
    missionId: 92,
    name: "Main Office Building",
    date: "2023-02-25",
    month: "February",
    drone: "Alpha-1",
    area: "Central Campus",
    duration: "51 minutes",
    distance: "1.8 km",
    coverage: "0.5 km²",
    images: 124,
    status: "completed",
    findings: "All clear",
  },
  {
    id: 205,
    missionId: 89,
    name: "Perimeter Security Inspection",
    date: "2023-02-15",
    month: "February",
    drone: "Gamma-3",
    area: "Full Perimeter",
    duration: "96 minutes",
    distance: "5.2 km",
    coverage: "1.8 km²",
    images: 276,
    status: "completed",
    findings: "Security fence damaged in NW corner",
  },
];

// @desc    Get all reports
// @route   GET /api/reports
// @access  Public
exports.getReports = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const reports = await Report.find();

    // Apply filters if provided
    let filteredReports = [...reports];

    // Filter by month
    if (req.query.month && req.query.month !== "all") {
      filteredReports = filteredReports.filter(
        (r) => r.month === req.query.month
      );
    }

    // Filter by drone
    if (req.query.drone && req.query.drone !== "all") {
      filteredReports = filteredReports.filter(
        (r) => r.drone === req.query.drone
      );
    }

    // Filter by area
    if (req.query.area && req.query.area !== "all") {
      filteredReports = filteredReports.filter(
        (r) => r.area === req.query.area
      );
    }

    // Get stats
    const totalDuration = filteredReports.reduce((sum, report) => {
      const minutes = parseInt(report.duration.split(" ")[0]);
      return sum + minutes;
    }, 0);

    const totalDistance = filteredReports.reduce((sum, report) => {
      const km = parseFloat(report.distance.split(" ")[0]);
      return sum + km;
    }, 0);

    const totalCoverage = filteredReports.reduce((sum, report) => {
      const km2 = parseFloat(report.coverage.split(" ")[0]);
      return sum + km2;
    }, 0);

    const totalImages = filteredReports.reduce(
      (sum, report) => sum + report.images,
      0
    );

    // Find unique filter values
    const uniqueMonths = [...new Set(reports.map((report) => report.month))];
    const uniqueDrones = [...new Set(reports.map((report) => report.drone))];
    const uniqueAreas = [...new Set(reports.map((report) => report.area))];

    res.status(200).json({
      success: true,
      count: filteredReports.length,
      data: filteredReports,
      stats: {
        totalMissions: filteredReports.length,
        totalFlightTime: totalDuration,
        totalDistance: totalDistance.toFixed(1),
        totalCoverage: totalCoverage.toFixed(1),
        totalImages,
        uniqueMonths,
        uniqueDrones,
        uniqueAreas,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Public
exports.getReport = async (req, res) => {
  try {
    // In a real app, this would fetch from database
    // const report = await Report.findById(req.params.id);
    const report = reports.find((r) => r.id === parseInt(req.params.id));

    if (!report) {
      return res.status(404).json({
        success: false,
        error: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create a report
// @route   POST /api/reports
// @access  Private
exports.createReport = async (req, res) => {
  try {
    // In a real app, this would save to database
    // const report = await Report.create(req.body);

    // Mock creation with ID assignment
    const newReport = {
      id: reports.length + 206, // Just to avoid ID conflicts with our mock data
      ...req.body,
      status: req.body.status || "completed",
      date: req.body.date || new Date().toISOString().split("T")[0],
      month:
        req.body.month ||
        new Date().toLocaleString("default", { month: "long" }),
    };

    // For demo purposes we'll just acknowledge success
    // In a real app we would push to actual array and save to DB

    res.status(201).json({
      success: true,
      data: newReport,
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

// @desc    Update report
// @route   PUT /api/reports/:id
// @access  Private
exports.updateReport = async (req, res) => {
  try {
    // In a real app, this would update in database
    // const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    const reportIndex = reports.findIndex(
      (r) => r.id === parseInt(req.params.id)
    );

    if (reportIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Report not found",
      });
    }

    // For demo purposes, we'll create an updated report but not actually update our array
    const updatedReport = {
      ...reports[reportIndex],
      ...req.body,
    };

    res.status(200).json({
      success: true,
      data: updatedReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private
exports.deleteReport = async (req, res) => {
  try {
    // In a real app, this would delete from database
    // const report = await Report.findById(req.params.id);

    const reportIndex = reports.findIndex(
      (r) => r.id === parseInt(req.params.id)
    );

    if (reportIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Report not found",
      });
    }

    // await report.remove(); // In a real app

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
