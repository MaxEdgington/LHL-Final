import React from "react";
import { Box, Typography } from "@mui/material";
import TaskList from "./TaskList";
import AddTaskButton from "./AddTaskButton";


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "../styles/ColumnListItem.scss";


const ColumnListItem = (props) => {
  const { name, filteredTasks } = props;
  return (

    <Box
      sx={{
        flex: 1,
        paddingTop: "8px",
        paddingBottom: "16px",
        bgcolor: "#eaeaee",
        "&:first-child": {
          paddingLeft: "5px",
          borderTopLeftRadius: 5,
        },
        "&:last-child": {
          paddingRight: "5px",
          borderTopRightRadius: 5,
        },
      }}
    >
      <div>
        <Typography align="center" variant="subtitle">
          <h2>This is Column - {name}</h2>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            padding: "5px",
          }}
        >
          <AddTaskButton />
          <TaskList filteredTasks={filteredTasks} />
          {/* <div> There will also be a new Task Button Here</div> */}
        </Box>
      </div >

    </Box>
  );
};

export default ColumnListItem;