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
const getProjectbyId = (id) => {
  return db
    .query(`SELECT * FROM projects WHERE id = $1`, [id])
    .then(data => {
      console.log("checking in the query", data.rows[0]);
      return data.rows[0];
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};


const addProject = (name, description, due_date, owner_id) => {
  return db.query(
    `INSERT INTO projects (name, description, due_date, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [name, description, due_date, owner_id] //owner_id was hard-coded 
  )
    .then(data => {
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

const getProjectsByOwner = (id) => {
  return db.query('SELECT * FROM projects WEHRE owner_id =$1', [id])
    .then(data => {
      console.log("checking in the query", data.rows[0]);
      return data.rows[0];
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

const getAllProjectsOfUser = (id) => {
  return db.query(
    `SELECT p.* 
    FROM projects AS p
    JOIN user_project_bridge AS upb ON p.id = upb.project_id
    WHERE upb.user_id = $1 
    
    UNION
    
    SELECT * FROM projects AS p
    WHERE p.owner_id = $1;`,
    [id])
    .then(data => {
      console.log("checking in the query", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

module.exports = { getProjectbyName, getProjectbyId, addProject, getProjectsByOwner, getAllProjectsOfUser };