import React from "react";
import TaskList from "./TaskList";

import { Box, Typography } from "@mui/material";
import "../styles/ColumnListItem.scss";

const ColumnListItem = (props) => {
  const { id, name, tasks } = props;
  return (
    <Box
      sx={{
        flex: 1,
        paddingTop: "8px",
        paddingBottom: "16px",
        margin: "8px",
        bgcolor: "white",
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
      <div className="column">
        <h2>{name}</h2>
        <TaskList id={id} tasks={tasks} />
        {id == 1 && <button>Add New Task</button>}
      </div>
    </Box>
  );
};

export default ColumnListItem;