import React, { useState, useContext } from "react";
import { Button, Drawer, Tooltip, Card, Typography, CardContent, Divider, Grid, TextField, Fab } from "@mui/material";
// import ChatIcon from '@mui/icons-material/ChatIcon';
// import ChevronRightIcon from '@mui/icons-material/ChevronRightIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { projectContext } from "../../providers/ProjectProvider";
import ChatList from "./ChatList";

const ChatDrawer = (props) => {
  const { url_param } = props;
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

  return (
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

        <Card className="rootChat" sx={{ bgcolor: 'primary.light' }}>
          <CardContent>
            <Grid container direction='row' justifyContent="space-between" alignItems="center">

              <Tooltip title="Close">
                <KeyboardArrowLeftIcon fontSize="large" className="iconCancelChat" onClick={toggleDrawer(false)} />
              </Tooltip>
              {/* <CommentIcon fontSize="large" className="titleIconChat" /> */}
              <Typography>Chat for {project.name}</Typography>

            </Grid>
          </CardContent>
        </Card>


        <ChatList />

        <Divider />

        <Card>
          <CardContent>
            <Grid container style={{ padding: '1px' }}>
              <Grid item xs={11}>
                <TextField id="outlined-basic-email" name="sendMessage" label="Send A Message" fullWidth />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab size="small" color="primary" aria-label="add"><SendIcon /></Fab>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      </Drawer>
    </ >
  );
};

export default ChatDrawer;