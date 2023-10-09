import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  Typography,
  Link,
  FormControlLabel,
  TextField,
} from "@mui/material";

// import background from '../../../public/do i want a background picture?';
import MyProjectListItem from "./MyProjectListItem";
import { userContext } from "../../providers/UserProvider";
import { projectContext } from "../../providers/ProjectProvider";

const MyProjectsList = () => {
  const { loggedinUser, selectUser } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchMyProjects } =
    useContext(projectContext);
  const params = useParams();

  console.log("is this the right params", params);

  useEffect(() => {
    selectUser(params.id);
    fetchMyProjects(params.id);
  }, [params]);
  // }, [loggedinUser]);

  console.log("don't got them", myProjects);
  console.log("do i have the user?", loggedinUser);
  const projectArr = myProjects.map((project) => {
    return (
      <MyProjectListItem
        key={project.id}
        id={project.id}
        name={project.name}
        desc={project.description}
        date={project.due_date}
        ownerID={project.owner_id}
      />
    );
  });

  return (
    <>
      <Box>
        <img src={loggedinUser.avatar} alt="syntax" height="50px" />
        <h1>{loggedinUser.username}'s Projects</h1>
        <ul className="mylist">{projectArr}</ul>
      </Box>
    </>
  );
};

export default MyProjectsList;
