const express = require("express");
const router = express.Router();
const Task = require("../Models/task");

//  Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

//  Add a new task
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Failed to add task" });
  }
});

//  Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
});

//  Toggle completed status
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});

module.exports = router;