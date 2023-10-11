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
      <Paper sx={{ display: 'flex', flexDirection: 'row', width: 'auto', margin: .5, padding: 1 }}>

        <Avatar alt={user_name} src={avatar} />
        {user_name}: {msg}

      </Paper>
    </Box >
  );
};
export default ChatListItem;
