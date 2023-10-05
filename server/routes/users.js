const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const usersQueries = require('../db/queries/users');


const userData = (email) => {
  return usersQueries.getUserByEmail(email);
  //no password checking yet!
};

//set the cookie-session
router.post('/api/set-session', (req, res) => {
  console.log("Setting the cookie in routes in the app.js", req.body);
  const email = req.body.email;
  const password = req.body.password; //
  userData(email)
    .then(user => {
      if (!user) {
        res.send({ error: "No account found with that email!" });
        return;
      }
      console.log("here is the userObj from the router.session.post", user);
      req.session = user.rows[0].id; //this is totally a guess??
      // res.status(200).send('Session data set successfully');
    });
});
module.exports = router;