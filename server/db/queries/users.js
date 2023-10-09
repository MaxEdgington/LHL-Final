const db = require('../../configs/db.config');

const getAllUsers = () => {
  return db.query("SELECT * FROM users;").then(data => {
    return data.rows;
  });
};

const getUserByEmail = email => {
  return db
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then(data => {
      console.log("am I getting the user in the query?", data.rows[0]);
      return data.rows[0];
    });
};

const getUserById = id => {
  return db
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then(data => {
      console.log("am I getting the user in the query?", data.rows[0]);
      return data.rows[0];
    });
};

module.exports = { getAllUsers, getUserByEmail, getUserById };