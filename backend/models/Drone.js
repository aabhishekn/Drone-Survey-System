const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Drone = sequelize.define("Drone", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "in-mission", "maintenance", "offline"),
      defaultValue: "available",
    },
    lastMission: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    batteryLevel: {
      type: DataTypes.INTEGER,
      validate: { min: 0, max: 100 },
      defaultValue: 100,
    },
  });

  return Drone;
};
