import React, { useContext } from "react";
import TaskList from "./TaskList";
import { Box, Typography } from "@mui/material";
import "../styles/ColumnListItem.scss";
import { columnsContext } from "../providers/ColumnsProvider";

const ColumnListItem = (props) => {
  const { id, name, tasks } = props;
  const { columns, addNewTask } = useContext(columnsContext);
  console.log("ColumnListItem props:", props); // Check the props
  console.log("Tasks received:", tasks); // Check the tasks data

  return (
    <Box
      sx={{
        flex: 1,
        paddingTop: "8px",
        paddingBottom: "16px",
        margin: "16px",
        width: "25%",
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
        <h2>{columns[id].name}</h2>
        <TaskList id={id} tasks={columns[id].tasks} />
        {id == 1 && <button onClick={addNewTask}>Add New Task</button>}
      </div>
    </Box>
  );
};

export default ColumnListItem;

//         <h2>{name}</h2>
//         <TaskList id={id} tasks={tasks} />
//         {id == 1 && <button onClick={addNewTask}>Add New Task</button>}
