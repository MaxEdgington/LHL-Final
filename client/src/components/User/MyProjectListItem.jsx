import React, { useContext } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography } from '@mui/material';
import { userContext } from '../../providers/UserProvider';
import { projectContext } from '../../providers/ProjectProvider';

const MyProjectListItem = (props) => {
  const { id, name } = props;
  const { loggedinUser } = useContext(userContext);
  const { myProjects, addProject, selectProject } = useContext(projectContext);

  return (
    <Box>
      <Paper>
        Project Name: {name}
      </Paper>
    </Box>
  );
};
export default MyProjectListItem;