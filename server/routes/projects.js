const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const projectQueries = require('../db/queries/projects');

//this gets each project by id inorder to set the state
router.get('/:id', async (req, res) => {
  try {
    console.log("PARAMS", req.params);
    const selectedProject = await projectQueries.getProjectbyId(req.params.id);
    console.log("checkign in the router", selectedProject);
    res.status(200).json(selectedProject); ////
  } catch (error) {
    console.error('Error during fetching projects-server side:', error);
    res.status(500).send('Server Error');
  }
});


//this adds a project
router.post('/add', async (req, res) => {
  console.log("adding project in route", req.body);
  try {
    const newProject = await projectQueries.addProject(req.body.project_name, req.body.project_description, req.body.project_due_date, req.body.owner_id); //do i need to destructure req
    console.log("newProject.rows", newProject[0]);
    res.status(200).json(newProject[0]);
  } catch (error) {
    console.error('Error during adding project-server side:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;