const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const messagesQueries = require('../db/queries/messages');


router.get('/:id', async (req, res) => {
  try {
    console.log("PARAMS", req.params);
    console.log("req", req);
    console.log('Server-side route URL:', req.url);
    const projectMessages = await messagesQueries.getMessagesofProjectWithUserInfo(req.params.id);
    console.log("checkign in the router", projectMessages);
    res.status(200).json(projectMessages); ////
  } catch (error) {
    console.error('Error during fetching messages-server side:', error);
    res.status(500).send('Server Error');
  }
});

//this adds a message
router.post('/add', async (req, res) => {
  console.log("adding message in route", req.body);
  try {
    const newMsg = await messagesQueries.addMessage(req.body.message, "2023-10-09T23:52:02.877Z", req.body.user_id, req.body.project_id);
    console.log("newProject.rows", newMsg[0]);
    res.status(200).json(newMsg[0]);
  } catch (error) {
    console.error('Error during adding project-server side:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;