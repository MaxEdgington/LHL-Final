import React, { useContext, useState, useEffect } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography, Link, FormControlLabel, TextField } from '@mui/material';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Checkbox from '@mui/material/Checkbox';
// import background from '../../../public/XXXXX';
import MyProjectListItem from './MyProjectListItem';
import { userContext } from '../../providers/UserProvider';
import { projectContext } from '../../providers/ProjectProvider';

const MyProjectsList = () => {
  const { loggedinUser } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchMyProjects } = useContext(projectContext);

  useEffect(() => {
    fetchMyProjects(loggedinUser.id);
    console.log(myProjects);
  }, []);

  return (
    <>
      <Box>
        <img src={loggedinUser.avatar} alt="syntax" height="50px" />
        <h1>{loggedinUser.username}'s Projects</h1>
        <ul>
          <MyProjectListItem />
        </ul>
      </Box>
    </>
  );

};

export default MyProjectsList;