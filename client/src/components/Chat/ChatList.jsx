import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Button, Drawer, Tooltip, Card, Typography, CardContent } from "@mui/material";
import ChatListItem from "./ChatListItem";
import { projectContext } from "../../providers/ProjectProvider";
import { messageContext } from "../../providers/MessageProvider";
import ChatBubble from 'react-chat-bubble';





const ChatList = () => {
  const { project } = useContext(projectContext);
  const { messages, fetchMessagesforProject } = useContext(messageContext);


  useEffect(() => {
    fetchMessagesforProject(project.id);
    // console.log("got them ", myProjects);
  }, [project]);

  // this.state.messages = messagesState.map((item, avatar) => {
  //   type: 0,
  //     image: { avatar; },
  //   text: { item; }
  // });

  // const mockList = ["this5", "that66", "the other", "one more"];
  // const mockArr = mockList.map((item) => {
  const messagesArr = messages.map((item) => {
    return (
      <ChatListItem
        key={item.message_id}
        msg={item.message}
        user_name={item.username}
        time={item.timestamp}
      // avatar={item.avatar}

      />
    );
  });
  console.log("chatlist - messages", messages);
  console.log("chatlist-mesgArr", messagesArr);


  return (
    <>
      inside chat list

      <Box
        sx={{ margin: 2.5 }}>
        {/* <Paper
        sx={{ margin: 1 }}> */}
        {/* <ChatBubble messages={messages} /> */}
        <ul>

          {messagesArr}
        </ul>
        {/* </Paper> */}
      </Box>

    </>
  );
};
export default ChatList;