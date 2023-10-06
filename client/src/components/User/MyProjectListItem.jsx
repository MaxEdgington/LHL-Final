import React, { useContext } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography } from '@mui/material';
import { userContext } from '../../providers/UserProvider';
import { projectContext } from '../../providers/ProjectProvider';

const MyProjectListItem = () => {
  const { loggedinUser } = useContext(userContext);
  const { myProjects, addProject, selectProject } = useContext(projectContext);


  return (
    <Box>
      <Paper>
        <li>
          <h5>here goes a project</h5>
        </li>
      </Paper>
    </Box>
  );
};
export default MyProjectListItem;