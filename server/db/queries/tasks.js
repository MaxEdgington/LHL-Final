const db = require("../../configs/db.config");

const addNewTask = async (title, column_id) => {
  try {
    // As per our seed data, the tasks table have columns: name, description, due_date.
    // Here, we're only adding name (title from frontend) and column_id. We can expand this later.
    const result = await db.query(
      "INSERT INTO tasks (name) VALUES ($1) RETURNING *",
      [title]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error during adding new task:", error);
    throw error;
  }
};

module.exports = {
  addNewTask,
};
