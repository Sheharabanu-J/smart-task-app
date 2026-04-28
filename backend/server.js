const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
const User = require("./models/User");
const Task = require("./models/Task");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// DB Relationship
User.hasMany(Task);
Task.belongsTo(User);

// Sync DB
sequelize.sync()
  .then(() => console.log("DB synced"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use("/api/tasks", taskRoutes);