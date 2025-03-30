const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const droneRoutes = require("./routes/droneRoutes");
const missionRoutes = require("./routes/missionRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/drones", droneRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/reports", reportRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Drone Survey Management API" });
});

// Database connection
const connectDB = async () => {
  try {
    // In a real application, you would use MongoDB/mongoose here
    // For this assignment demo, we'll just log successful "connection"
    console.log("Database connection simulated");

    // Actual MongoDB connection would look like:
    // await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // console.log('MongoDB Connected');
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
