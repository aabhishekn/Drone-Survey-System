const mongoose = require("mongoose");

const DroneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Drone name is required"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Drone model is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["available", "in-mission", "maintenance", "decommissioned"],
    default: "available",
  },
  batteryLevel: {
    type: Number,
    min: 0,
    max: 100,
    default: 100,
  },
  lastMission: {
    type: Date,
    default: null,
  },
  capabilities: {
    camera: {
      type: Boolean,
      default: true,
    },
    thermal: {
      type: Boolean,
      default: false,
    },
    lidar: {
      type: Boolean,
      default: false,
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated field on save
DroneSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model("Drone", DroneSchema);
