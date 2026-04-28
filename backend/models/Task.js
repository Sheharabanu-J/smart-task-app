const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },

  priority: {
    type: DataTypes.STRING, // High / Medium / Low
  },

  dueDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Task;