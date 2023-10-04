// routes/tasks.js
const express = require("express");
const router = express.Router();
const db = require("../configs/db.config"); // Adjust the path to point to your actual db config file
const tasksQueries = require("../db/queries/tasks");

router.get("/", async (req, res) => {
  console.log("Tasks route hit");
  try {
    const tasks = await db.query("SELECT * FROM tasks");
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error("Error during fetching tasks:", error);
    res.status(500).send("Server Error");
  }
});

router.post('/:id/delete', async(req, res) => {
    try{
        console.log("deleting tasks No.: ", req.params)
        await db.query('DELETE FROM tasks WHERE id=$1', [req.params.id]);
        console.log("deleted")
    } catch (error) {
        console.error('Error during fetching tasks:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
router.post("/add", async (req, res) => {
  console.log("POST /add route hit. Body:", req.body); // Log the incoming request

  try {
    // Extract task data from request body
    const { title } = req.body;
    // Ideally, we'd want to have more details about the task
    // here, for simplicity, we're just getting the title and column_id

    // Add the task to the database
    // This is a hypothetical function. Your actual function will depend on your database logic
    const newTask = await tasksQueries.addNewTask(title);

    // Respond with the new task
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to add new task" });
  }
});

module.exports = router;
