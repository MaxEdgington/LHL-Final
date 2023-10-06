import React, { useContext } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography, Link } from '@mui/material';
import { userContext } from '../../providers/UserProvider';
import { projectContext } from '../../providers/ProjectProvider';

const MyProjectListItem = (props) => {
  const { id, name, setView } = props;
  const { loggedinUser } = useContext(userContext);
  const { myProjects, addProject, selectProject } = useContext(projectContext);

  const handleClick = (name) => {
    selectProject(name);
    setView(1);
  };
  return (
    <Box>
      <Paper>
        Project Name: {name} <span onClick={() => handleClick(name)}>Link</span>
      </Paper>
    </Box>
  );
};
export default MyProjectListItem;