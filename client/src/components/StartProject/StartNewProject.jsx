import React from 'react';
import NewProjectForm from './NewProjectForm';
import { Box, Typography } from "@mui/material";

function StartNewProject(props) {
  const { SetView } = props;

  return (

    <Box>
      <NewProjectForm SetView={SetView} />
    </Box>

  );
}

export default StartNewProject;
