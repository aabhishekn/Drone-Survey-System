const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Report name is required"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  drone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drone",
    required: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number, // minutes
    required: true,
  },
  distance: {
    type: Number, // kilometers
    required: true,
  },
  coverage: {
    type: Number, // square kilometers
    required: true,
  },
  images: {
    type: Number,
    default: 0,
  },
  findings: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["draft", "completed", "reviewed"],
    default: "completed",
  },
  dataCollected: {
    images: [
      {
        type: String, // URL or path to image
        trim: true,
      },
    ],
    thermalData: [
      {
        type: String, // URL or path to thermal image
        trim: true,
      },
    ],
    lidarData: [
      {
        type: String, // URL or path to LiDAR data
        trim: true,
      },
    ],
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
ReportSchema.pre("save", function (next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model("Report", ReportSchema);
