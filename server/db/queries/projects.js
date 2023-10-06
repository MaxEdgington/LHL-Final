const db = require('../../configs/db.config');


const getProjectbyName = (name) => {
  return db
    .query(`SELECT * FROM projects WHERE name = $1`, [name])
    .then(data => {
      console.log("checking in the query", data.rows[0]);
      return data.rows[0];
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

const addProject = (name, description, due_date) => {
  return db.query(
    `INSERT INTO projects (name, description, due_date, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [name, description, due_date, 3] //owner_id hard-coded until we have a cookie/session
  )
    .then(data => {
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

module.exports = { getProjectbyName, addProject };