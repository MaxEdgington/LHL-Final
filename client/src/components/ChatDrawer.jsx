import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";


const ChatDrawer = () => {
  const [drawerState, setDrawerState] = useState(false);

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
    // {(['Cat'] as const).map((anchor) => (
    <div >
      <Button onClick={toggleDrawer(true)}>Open Chat</Button>
      <Drawer
        anchor={'right'}
        open={drawerState}
        onClose={toggleDrawer(false)}
      >
        <p>something here?</p>
      </Drawer>
    </div >
  );
};

export default ChatDrawer;