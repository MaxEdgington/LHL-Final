// routes/tasks.js
const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
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

router.post("/add", async (req, res) => {
  console.log("POST /add route hit. Body:", req.body);

  try {
    const { title } = req.body;
    const newTask = await tasksQueries.addNewTask(title);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to add new task" });
  }
});

router.post("/:id/delete", async (req, res) => {
  //We may be succeptible to a SQL injection here, Instead of using POST for the delete operation, mabye HTTP DELETE method? - Stretch
  try {
    console.log("deleting tasks No.: ", req.params.id);
    await db.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.status(200).send("deleted!");
  } catch (error) {
    console.error("Error during fetching tasks:", error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id", async (req, res) => {
    const { new_column_status, new_task_index} = req.body;
    console.log("new_column_status:", new_column_status)
    console.log("new_task_index:", new_task_index)
    
    const task_id = req.params.id
    console.log("req.params:",req.params.id )
    try{
        await db.query(`UPDATE tasks SET status = $1, index = $2 WHERE id = $3`, [new_column_status, new_task_index, task_id]);
        res.status(200).send("New location saved!");
    } catch (error) {
    console.error("Error during dragging tasks:", error);
    res.status(500).send("Server Error");
    }
})

module.exports = router;
