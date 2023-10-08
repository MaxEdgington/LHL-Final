import React, { useState, useContext } from "react";
import { Button, Drawer, Tooltip, Card, Typography, CardContent, } from "@mui/material";
// import ChatIcon from '@mui/icons-material/ChatIcon';
// import ChevronRightIcon from '@mui/icons-material/ChevronRightIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CommentIcon from '@mui/icons-material/Comment';
import { projectContext } from "../../providers/ProjectProvider";
import ChatList from "./ChatList";

const ChatDrawer = () => {
  const [drawerState, setDrawerState] = useState(false);
  const { project } = useContext(projectContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      (event.key === "backdropClick" || event.type === "escapeKeyDown")
    ) {
      return;
    }
    setDrawerState(open);
  };
  console.log("In the chat drawer", project);

  return (
    // {(['Cat'] as const).map((anchor) => (
    < >
      {/* change this to icon? */}
      <Tooltip title="Chat">
        <Button onClick={toggleDrawer(true)}>Open Chat</Button>
      </Tooltip>


      <Drawer
        anchor={'right'}
        open={drawerState}
        onClose={toggleDrawer(false)}
      >

        <Card className="rootChat">
          <CardContent>

            <Typography className="titleChat" gutterBottom>
              {/* <div className="titleContainerChat"> */}
              <CommentIcon fontSize="large" className="titleIconChat" />
              <span>Chat for {project.name}</span>
              {/* </div> */}
              {/* <div className="buttonContainerChat" > */}
              <Tooltip title="Close">
                <KeyboardArrowLeftIcon fontSize="large" className="iconCancelChat" onClick={toggleDrawer(false)} /></Tooltip>
              {/* </div> */}
            </Typography>
            {/* <App /> */}
          </CardContent>
        </Card>


        <ChatList />


      </Drawer>
    </ >
  );
};

export default ChatDrawer;