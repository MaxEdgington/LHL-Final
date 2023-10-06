const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const usersQueries = require('../db/queries/users');


//set the cookie-session
router.post('/set-session', async (req, res) => {
  console.log("user route req.body", req.body); //this is empty??
  // const { email } = req.body.email;
  // const password = req.body.password; //
  try {
    const requestedUser = await usersQueries.getUserByEmail(req.body.email);
    console.log("query response in the route", requestedUser);
    req.session.user = requestedUser; //this is totally a guess??
    console.log("set session in route", req.session);
    // return req.session;
    res.json(req.session);
  } catch (error) {
    console.error('Error during adding project-server side:', error);
    res.status(500).send('Server Error');
  }

  // if (!user) {
  //   res.send({ error: "No account found with that email!" });
  //   return;
  // }
  // res.status(200).send('Session data set successfully');
  // });
});

router.post("/logout", (req, res) => {
  res.clearCookie('session');
  console.log("clear session in route", req.session);
  res.redirect("/");
});

module.exports = router;