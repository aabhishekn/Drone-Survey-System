const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const sequelize = new Sequelize({
  ...config.development,
  logging: console.log,
  retry: {
    max: 3,
    timeout: 3000,
  },
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Import model definitions
const DroneModel = require("./Drone");
const MissionModel = require("./Mission");
const ReportModel = require("./Report");

// Initialize models
const Drone = DroneModel(sequelize);
const Mission = MissionModel(sequelize);
const Report = ReportModel(sequelize);

// Define relationships
Drone.hasMany(Mission, {
  foreignKey: "droneId",
  as: "missions",
});

Mission.belongsTo(Drone, {
  foreignKey: "droneId",
  as: "drone",
});

// Add sync function
const syncDatabase = async () => {
  try {
    // Set force: false to preserve data
    await sequelize.sync({ force: false });
    console.log("Database synchronized without data loss");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};

// Export models and sequelize instance
module.exports = {
  sequelize,
  Drone,
  Mission,
  Report,
  syncDatabase,
};
