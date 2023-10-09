const db = require('../../configs/db.config');


const getMessagesofProjectWithUserInfo = (id) => {
  return db.query(
    `SELECT
    cm.id AS message_id,
    cm.message,
    cm.timestamp,
    u.id AS user_id,
    u.username,
    u.avatar
FROM
    chat_messages cm
INNER JOIN
    users u ON cm.user_id = u.id
WHERE
    cm.project_id = $1`,
    [id])
    .then(data => {
      console.log("checking in the query", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};

const addMessage = (message, timestamp, user_id, project_id) => {
  return db.query(
    `INSERT INTO chat_messages (message, timestamp, user_id, project_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`,
    [message, timestamp, user_id, project_id]
  )
    .then(data => {
      console.log("checking in the addMessage query", data.rows);
      return data.rows;
    }).catch(err => {
      console.error("Error executing query: ", err);
      throw err;
    });
};


module.exports = { getMessagesofProjectWithUserInfo, addMessage };