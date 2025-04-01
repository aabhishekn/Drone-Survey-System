const { Report, Mission } = require("../models");
const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");

exports.syncCompletedMissions = async () => {
  try {
    const completedMissions = await Mission.findAll({
      where: { status: "completed" },
      include: ["drone"],
    });

    for (const mission of completedMissions) {
      const existingReport = await Report.findOne({
        where: { name: mission.name },
      });

      if (!existingReport) {
        await Report.create({
          name: mission.name,
          date: new Date(),
          drone: mission.drone?.name || "Default Drone",
          area: mission.area || 100,
          duration: mission.duration || 30,
          distance: mission.distance || 2.5,
          findings: "Mission completed successfully",
          month: new Date().toLocaleString("default", { month: "long" }),
          status: "completed",
        });
      }
    }
  } catch (error) {
    console.error("Error syncing completed missions:", error);
  }
};

exports.getReports = async (req, res) => {
  try {
    await exports.syncCompletedMissions();
    const reports = await Report.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, error: "Report not found" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, error: "Report not found" });
    }
    await report.update(req.body);
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) {
      return res
        .status(404)
        .json({ success: false, error: "Report not found" });
    }
    await report.destroy();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.exportReports = async (req, res) => {
  try {
    const where = {};
    if (req.query.month) where.month = req.query.month;
    if (req.query.drone) where.drone = req.query.drone;
    if (req.query.area) where.area = req.query.area;

    const reports = await Report.findAll({ where });
    const format = req.params.format;

    if (format === "pdf") {
      const doc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=survey-reports.pdf"
      );
      doc.pipe(res);

      doc.fontSize(20).text("Survey Reports", { align: "center" });
      doc.moveDown();

      reports.forEach((report) => {
        doc.fontSize(12).text(`Mission: ${report.name}`);
        doc
          .fontSize(10)
          .text(`Date: ${report.date}`)
          .text(`Drone: ${report.drone}`)
          .text(`Area: ${report.area}`)
          .text(`Duration: ${report.duration}`)
          .text(`Distance: ${report.distance}`)
          .text(`Images: ${report.images}`)
          .text(`Findings: ${report.findings}`);
        doc.moveDown();
      });

      doc.end();
    } else if (format === "csv") {
      const fields = [
        "name",
        "date",
        "drone",
        "area",
        "duration",
        "distance",
        "findings",
      ];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(reports);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=survey-reports.csv"
      );
      res.send(csv);
    } else {
      res.status(400).json({ success: false, error: "Invalid export format" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.clearReports = async (req, res) => {
  try {
    await Report.destroy({ where: {} });
    res
      .status(200)
      .json({ success: true, message: "All reports cleared successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
