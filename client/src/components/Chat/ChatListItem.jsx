import React, { useState, useContext } from "react";
import { Box, Paper, Tooltip, Card, Typography, CardContent, listClasses, } from "@mui/material";
import ChatBubble from 'react-chat-bubble';

import { projectContext } from "../../providers/ProjectProvider";




const ChatListItem = (props) => {
  const { msg, user_name, time } = props;
  const { project } = useContext(projectContext);
  console.log("what is item", msg, user_name, time);
  return (
    <Box
      sx={{ margin: 2.5 }}>
      <Paper
        sx={{ margin: 1 }}>
        {user_name}:  {msg}
        {/* <ChatBubble messages={msg.message} /> */}
      </Paper>
    </Box>
  );
};
export default ChatListItem;
