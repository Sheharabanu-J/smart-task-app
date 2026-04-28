const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("smarttask", "postgres", "1507", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;