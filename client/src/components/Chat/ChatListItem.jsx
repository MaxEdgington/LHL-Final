import React, { useState, useContext } from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  Typography,
  CardContent,
  Avatar,
} from "@mui/material";

import { projectContext } from "../../providers/ProjectProvider";

const ChatListItem = (props) => {
  const { msg, user_name, time, avatar } = props;
  const { project } = useContext(projectContext);

  console.log("what is item", msg, user_name, time);


  return (
    <Box sx={{ margin: 2.5 }}>
      <Paper sx={{ margin: 2, padding: 1 }}>
        <Grid container flex-direction="row">
          <Avatar alt={user_name} src={avatar} />
          {user_name}: {msg}
        </Grid>
      </Paper>
    </Box>
  );
};
export default ChatListItem;
