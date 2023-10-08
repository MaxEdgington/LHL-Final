import React, { useState, useContext } from "react";
import { Box, Paper, Tooltip, Card, Typography, CardContent, listClasses, } from "@mui/material";

import { projectContext } from "../../providers/ProjectProvider";

const ChatListItem = (props) => {
  const { name } = props;
  const { project } = useContext(projectContext);

  return (
    <Box
      sx={{ margin: 2.5 }}>
      <Paper
        sx={{ margin: 1 }}>
        <span>{name}</span>
      </Paper>
    </Box>
  );
};
export default ChatListItem;