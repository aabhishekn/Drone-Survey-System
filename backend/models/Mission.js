const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Mission",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Start date is required" },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "End date is required" },
          isAfterStart(value) {
            if (this.startDate && value <= this.startDate) {
              throw new Error("End date must be after start date");
            }
          },
        },
      },
      isRecurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      recurringInterval: {
        type: DataTypes.ENUM("daily", "weekly", "biweekly", "monthly"),
        defaultValue: "weekly",
      },
      status: {
        type: DataTypes.ENUM(
          "scheduled",
          "in-progress",
          "completed",
          "aborted",
          "cancelled"
        ),
        defaultValue: "scheduled",
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      waypoints: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      flightParams: {
        type: DataTypes.JSON,
        defaultValue: {
          altitude: 120,
          speed: 15,
          sensors: {
            camera: true,
            thermal: false,
            lidar: false,
          },
          dataCollection: {
            captureInterval: 5,
            overlapPercentage: 60,
          },
        },
      },
      logs: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
