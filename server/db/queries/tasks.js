const db = require("../../configs/db.config");

const addNewTask = async (title, description, project_id) => {
  try {
    console.log("Inserting task with data:", {
      title: title,
      description: description,
      project_id: project_id,
    });

    const result = await db.query(
      "INSERT INTO tasks (name, description, project_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, project_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error during adding new task:", error);
    throw error;
  }
};
const deleteTask = async (taskId) => {
  try {
    console.log("deleting tasks No.: ", taskId);
    await db.query("DELETE FROM tasks WHERE id=$1", [taskId]);
  } catch (error) {
    console.error("Error during deleting tasks:", error);
    throw error;
  }
};

const getUserbyTaskId = async (task_id) => {
  try {
    const result = await db.query(
      "SELECT users.username FROM users JOIN tasks ON tasks.assigned_user=users.id WHERE tasks.id=$1",
      [task_id]
    );
    console.log("result.rows:", result.rows);

    if (result.rows.length === 0) {
      return "No assigned user";
    }

    return result.rows[0].username;
  } catch (error) {
    console.error("Error during showing assigned user name:", error);
    throw error;
  }
};

const getTasksbyProject = async (project_id) => {
  return db
    .query(`SELECT * FROM tasks WHERE project_id = $1`, [project_id])
    .then((data) => {
      console.log("checking in the query", data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.error("Error finding tasks for your project", err);
      throw err;
    });
};

module.exports = {
  addNewTask,
  deleteTask,
  getUserbyTaskId,
  getTasksbyProject,
};
