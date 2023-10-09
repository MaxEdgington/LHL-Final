const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const usersQueries = require('../db/queries/users');
const projectQueries = require('../db/queries/projects');


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
    // res.json(requestedUser);
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

//gets all the projects of a specific user
router.get('/myprojects/:id', async (req, res) => {
  try {
    console.log("my projects PARAMS", req.params);
    const myProjects = await projectQueries.getAllProjectsOfUser(Number(req.params.id));
    console.log("checkign in the router", myProjects);
    res.status(200).json(myProjects);
  } catch (error) {
    console.error('Error during fetching projects-server side:', error);
    res.status(500).send('Server Error');
  }
});

//gets deatils of a user
router.get(`/api/users/:id`, async (req, res) => {
  try {
    console.log("users PARAMS", req.params);
    const userData = await usersQueries.getUserById(Number(req.params.id));
    console.log("checkign in the router", userData);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error during fetching projects-server side:', error);
    res.status(500).send('Server Error');
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie('session');
  console.log("clear session in route", req.session);
  res.redirect("/");
});

module.exports = router;