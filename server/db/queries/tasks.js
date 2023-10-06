const db = require("../../configs/db.config");

const addNewTask = async (title, column_id) => {
  try {
    // As per our seed data, the tasks table have columns: name, description, due_date.
    // Here, we're only adding name (title from frontend) and column_id. We can expand this later.
    const result = await db.query(
      "INSERT INTO tasks (name, project_id) VALUES ($1, $2) RETURNING *",
      [title,1]
      // We hard coded project_id as 1
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error during adding new task:", error);
    throw error;
  }
};

const deleteTask = async(taskId) => {
  try {
    console.log("deleting tasks No.: ", taskId);
    await db.query("DELETE FROM tasks WHERE id=$1", [taskId]);
  } catch (error) {
    console.error("Error during deleting tasks:", error);
    throw error;
  }
}
module.exports = {
  addNewTask,
  deleteTask,
};
