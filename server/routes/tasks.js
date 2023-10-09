// routes/tasks.js
const express = require("express");
const router = express.Router();
const db = require("../configs/db.config");
const tasksQueries = require("../db/queries/tasks");
const projectQueries = require("../db/queries/projects");

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

router.get("", async (req, res) => {
  //new route? or just slash to replace above?
  try {
    const tasks = await tasksQueries.getTasksbyProject(project_id);
    res.status(200).json(tasks.rows);
  } catch (error) {
    console.error("Error during fetching tasks:", error);
    res.status(500).send("Server Error");
  }
});

router.post("/add", async (req, res) => {
  console.log("POST /add route hit. Body:", req.body);

  try {
    const title = req.body.title; //used to be an object?
    const project = req.body.project_id;
    const newTask = await tasksQueries.addNewTask(title, project);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to add new task" });
  }
});

router.post("/add-batch", async (req, res) => {
  console.log("POST /add-batch route hit. Body:", req.body);

  const client = await db.connect();
  try {
    const tasks = req.body.tasks;
    const project = req.body.project;
    console.log(tasks, project);

    if (!Array.isArray(tasks)) {
      res.status(400).json({ error: "Tasks should be an array" });
      return;
    }
    const newProject = await projectQueries.addProject(
      project.projectName,
      project.projectDescription,
      project.projectDueDate
    ); //do i need to destructure req
    const project_id = newProject[0].id;

    await client.query("BEGIN");
    const addedTasks = [];

    for (const task of tasks) {
      const newTask = await tasksQueries.addNewTask(
        task.title,
        task.description,
        project_id
      );

      addedTasks.push(newTask);
    }
    await client.query("COMMIT");

    res.status(201).json({ addedTasks, project_id });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Failed to add tasks" });
  } finally {
    client.release();
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    const taskId = req.params.id;
    await tasksQueries.deleteTask(taskId);
    res.status(200).send();
    console.log("deleted!");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

router.post("/:id", async (req, res) => {
  const { new_column_status, new_task_index } = req.body;
  const task_id = req.params.id;

  // console.log("destination.index:", new_task_index)

  try {
    await db.query(`UPDATE tasks SET status=$1, index=$2 WHERE id=$3`, [
      new_column_status,
      new_task_index,
      task_id,
    ]);
    res.status(200).send();
    console.log("New location saved!", new_task_index);
  } catch (error) {
    console.error("Error during dragging tasks:", error);
    res.status(500).send("Server Error");
  }
});

router.post("/:id/onecolumn", async (req, res) => {
  const { new_task_index } = req.body;
  const task_id = req.params.id;

  try {
    await db.query(`UPDATE tasks SET index=$1 WHERE id=$2`, [
      new_task_index,
      task_id,
    ]);
    res.status(200).send();
    console.log("New location saved in one column!", new_task_index);
  } catch (error) {
    console.error("Error during dragging tasks:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id/assigned_user", async (req, res) => {
  const task_id = req.params.id;

  console.log("Task_id", task_id);

  try {
    const user_name = await tasksQueries.getUserbyTaskId(task_id);
    res.status(200).json(user_name);
    //   console.log("user_name is:", user_name)
  } catch (error) {
    console.error("Error during showing assigned user  name:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
