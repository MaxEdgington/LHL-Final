const db = require('../../configs/db.config');

const getColumnsWithTasks = () => {
  return db.query("SELECT * FROM users").then(data => {
    console.log("Users Data: ", data.rows);
    return data.rows;
  }).catch(err => {
    console.error("Error executing query: ", err);
    throw err;
  });
};

module.exports = { getColumnsWithTasks };