const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const { sequelize } = require("./models");
const droneRoutes = require("./routes/droneRoutes");
const missionRoutes = require("./routes/missionRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/drones", droneRoutes);
app.use("/api/v1/missions", missionRoutes);
app.use("/api/v1/reports", reportRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Drone Survey Management API" });
});

const startServer = async () => {
  try {
    console.log(
      "Database location:",
      path.join(__dirname, "/data/database.sqlite")
    );
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: false });
    console.log("Database synced without forcing recreation");

    const PORT = process.env.PORT || 5005;

    const server = app
      .listen(PORT)
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(
            `Port ${PORT} is already in use. Please try a different port.`
          );
          process.exit(1);
        } else {
          console.error("Server error:", err);
          process.exit(1);
        }
      })
      .on("listening", () => {
        console.log(`Server running on port ${PORT}`);
      });

    process.on("SIGTERM", () => {
      console.info("SIGTERM signal received.");
      server.close(async () => {
        await sequelize.close();
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer().catch((err) => {
  console.error("Unhandled error during server startup:", err);
  process.exit(1);
});
