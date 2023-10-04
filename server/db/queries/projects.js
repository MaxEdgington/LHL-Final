const db = require('../../configs/db.config');
//is this th eright connection?? that fiel exports "pool"


const getProject = (id) => {
  return db
    .query(`SELECT * FROM projects WHERE id = ${id}`)
    .then(data => {
      return data.rows;
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

module.exports = { getProject, addProject };