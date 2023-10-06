const db = require("../../configs/db.config");

const addNewTask = async (title, project_id) => {
  try {
    // As per our seed data, the tasks table have columns: name, description, due_date.
    // Here, we're only adding name (title from frontend) and column_id. We can expand this later.
    const result = await db.query(
      "INSERT INTO tasks (name, project_id) VALUES ($1, $2) RETURNING *",
      [title, project_id]
    );
    console.log("int eh add query", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error during adding new task:", error);
    throw error;
  }
};

const getTasksbyProject = async (project_id) => {
  return db
    .query(`SELECT * FROM tasks WHERE project_id = $1`, [project_id])
    .then(data => {
      console.log("checking in the query", data.rows[0]);
      return data.rows[0];
    }).catch(err => {
      console.error("Error finding tasks for your project", err);
      throw err;
    });
};


module.exports = {
  addNewTask,
  getTasksbyProject
};
