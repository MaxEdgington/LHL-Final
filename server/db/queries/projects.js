const db = require('../../configs/db.config');

const getAllProjects = () => {
  return db
    .query(`SELECT * FROM projects`)
    .then(data => {
      console.log("checking in the query", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

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


const addProject = (name, description, due_date) => {
  return db.query(
    `INSERT INTO projects (name, description, due_date, owner_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [name, description, due_date, 3] //owner_id is currently hard coded 
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

const getAllProjectsWithOwnerDetails = () => {
  return db
    .query(`
    SELECT p.id AS project_id,
    p.name AS project_name,
    p.description AS project_description,
    p.due_date AS project_due_date,
    u.id AS owner_id,
    u.username AS owner_username,
    u.email AS owner_email,
    u.avatar AS owner_avatar
FROM
    projects AS p
JOIN
    users AS u ON p.owner_id = u.id`)
    .then(data => {
      console.log("checking in the query", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

const getAllProjectsOfUserWithOwnerDetails = (id) => {
  return db.query(
    `WITH project_owner_info AS (
    SELECT
        p.id AS project_id,
        p.name AS project_name,
        p.description AS project_description,
        p.due_date AS project_due_date,
        u.id AS owner_id,
        u.username AS owner_username,
        u.email AS owner_email,
        u.avatar AS owner_avatar
    FROM
        projects AS p
    JOIN
        users AS u ON p.owner_id = u.id
    )
    
    SELECT o.*
    FROM project_owner_info AS o
    JOIN user_project_bridge AS upb ON o.project_id = upb.project_id
    WHERE upb.user_id = $1
    UNION
    SELECT *
    FROM project_owner_info AS o
    WHERE o.owner_id = $1;`,
    [id])
    .then(data => {
      console.log("checking second querydata", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};


module.exports = {
  getProjectbyName,
  getProjectbyId,
  addProject,
  getProjectsByOwner,
  getAllProjectsOfUser,
  getAllProjects,
  getAllProjectsWithOwnerDetails,
  getAllProjectsOfUserWithOwnerDetails
};