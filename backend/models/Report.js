const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Report = sequelize.define("Report", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    drone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Default Drone",
    },
    area: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    duration: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    distance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    findings: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    month: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "completed",
    },
  });

  return Report;
};
