import React from 'react';
import NewProjectForm from './NewProjectForm';
import { Box, Typography } from "@mui/material";

function StartNewProject(props) {
  const { setView } = props;

  return (

    <Box>
      <NewProjectForm setView={setView} />
    </Box>

  );
}

export default StartNewProject;
