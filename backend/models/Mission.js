const mongoose = require("mongoose");

const WaypointSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  altitude: {
    type: Number,
    default: 100, // meters
  },
  action: {
    type: String,
    enum: ["waypoint", "capture", "hover", "return"],
    default: "waypoint",
  },
  durationSeconds: {
    type: Number,
    default: 0,
  },
});

const MissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Mission name is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    required: [true, "Survey area is required"],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringInterval: {
    type: String,
    enum: ["daily", "weekly", "biweekly", "monthly"],
    default: "weekly",
  },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "aborted", "cancelled"],
    default: "scheduled",
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  drones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drone",
      required: true,
    },
  ],
  waypoints: [WaypointSchema],
  flightParams: {
    altitude: {
      type: Number,
      default: 120, // meters
    },
    speed: {
      type: Number,
      default: 15, // m/s
    },
    sensors: {
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
    dataCollection: {
      captureInterval: {
        type: Number,
        default: 5, // seconds
      },
      overlapPercentage: {
        type: Number,
        default: 60, // %
      },
    },
  },
  logs: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      message: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["info", "warning", "error"],
        default: "info",
      },
    },
  ],
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
MissionSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model("Mission", MissionSchema);
