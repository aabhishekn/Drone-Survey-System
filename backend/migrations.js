const { sequelize, Drone, Mission, Report } = require("./models");
const { drones, missions, reports, missionDrones } = require("./seedData");

const migrate = async () => {
  try {
    // Force sync (drops existing tables)
    await sequelize.sync({ force: true });
    console.log("Database tables created");

    // Insert seed data sequentially
    console.log("Creating drones...");
    const createdDrones = await Drone.bulkCreate(drones);
    console.log(`Created ${createdDrones.length} drones`);

    console.log("Creating missions...");
    const createdMissions = await Mission.bulkCreate(missions);
    console.log(`Created ${createdMissions.length} missions`);

    console.log("Creating mission-drone associations...");
    // Map the IDs from created records to missionDrones data
    const mappedMissionDrones = missionDrones.map((md) => ({
      MissionId: md.MissionId,
      DroneId: md.DroneId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const MissionDrones = sequelize.model("MissionDrones");
    await MissionDrones.bulkCreate(mappedMissionDrones);
    console.log(
      `Created ${mappedMissionDrones.length} mission-drone associations`
    );

    console.log("Creating reports...");
    // Update report data to include valid Mission and Drone IDs
    const mappedReports = reports.map((report, index) => ({
      ...report,
      MissionId: createdMissions[index % createdMissions.length].id,
      DroneId: createdDrones[index % createdDrones.length].id,
    }));
    await Report.bulkCreate(mappedReports);
    console.log(`Created ${mappedReports.length} reports`);

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error.message);
    if (error.parent) {
      console.error("Detailed error:", error.parent.message);
    }
    if (error.sql) {
      console.error("Failed SQL:", error.sql);
    }
  } finally {
    await sequelize.close();
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  migrate();
}

module.exports = migrate;
