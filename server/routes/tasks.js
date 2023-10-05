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

router.post('/:id/delete', async(req, res) => {
    try{
        console.log("deleting tasks No.: ", req.params)
        await db.query('DELETE FROM tasks WHERE id=$1', [req.params.id]);
        res.status(200).send()
        console.log("----deleted")
    } catch (error) {
        console.error('Error during fetching tasks:', error);
        res.status(500).send('Server Error');
    }
});

// module.exports = router;
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
    console.log("deleting tasks No.: ", req.params);
    await db.query("DELETE FROM tasks WHERE id=$1", [req.params.id]);
    res.status(200).send();
    console.log("----deleted");
  } catch (error) {
    console.error("Error during fetching tasks:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
