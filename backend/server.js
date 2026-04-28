const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

// Models (IMPORTANT for associations)
const User = require("./models/User");
const Task = require("./models/Task");

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Relationships (must come before sync)
User.hasMany(Task);
Task.belongsTo(User);

// Routes (keep together)
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Sync DB & start server
sequelize.sync()
  .then(() => {
    console.log("DB synced");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("DB error:", err);
  });