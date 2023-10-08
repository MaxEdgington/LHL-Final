import React, { useState, useContext } from "react";
import { Button, Drawer, Tooltip, Card, Typography, CardContent, listClasses, } from "@mui/material";
import ChatListItem from "./ChatListItem";
import { projectContext } from "../../providers/ProjectProvider";

const ChatList = () => {
  const { project } = useContext(projectContext);

  const mockList = ["this5", "that66", "the other", "one more"];
  const mockArr = mockList.map((item) => {
    return (
      <ChatListItem
        key={item.length}
        name={item}
      />
    );
  });

  return (
    <>
      something inside chat list
      <ul>

        {mockArr}
      </ul>

    </>
  );
};
export default ChatList;