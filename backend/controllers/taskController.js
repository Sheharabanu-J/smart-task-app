const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      priority,
      dueDate,
      UserId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.update(req.body, {
      where: { id, UserId: req.user.id },
    });

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.destroy({
      where: { id, UserId: req.user.id },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};