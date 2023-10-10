import React, { useState, useContext } from "react";
import TaskList from "./TaskList";
import { Box, Paper } from "@mui/material";
// import "../../styles/ColumnListItem.scss";
import { columnsContext } from "../../providers/ColumnsProvider";

const ColumnListItem = (props) => {
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { id, url_param } = props;
  const { columns, addNewTask } = useContext(columnsContext);

  const handleAddNewTask = (e) => {
    e.preventDefault();
    console.log("in the add new task click", url_param);
    if (newTask.trim() === "") {
      // prevent adding empty tasks
      return;
    }

    // Call the addNewTask from context and pass the newTask
    addNewTask(newTask, url_param);

    // Reset the input and hide the form
    setNewTask("");
    setIsAddingTask(false);
  };

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };

  return (
    <Paper
      elevation={10}
      sx={{
        flex: 1,
        paddingTop: "8px",
        paddingBottom: "16px",
        margin: "16px",
        width: "25%",
        bgcolor: "white",
        // "&:first-child": {
        //   paddingLeft: "5px",
        //   borderTopLeftRadius: 5,
        // },
        // "&:last-child": {
        //   paddingRight: "5px",
        //   borderTopRightRadius: 5,
        // },
      }}
    >
      {/* <Paper elevation={10} style={paperStyle}> */}
      <div className="column">
        <h2>{columns[id].name}</h2>
        <TaskList id={id} tasks={columns[id].tasks} />
        {id == 1 && !isAddingTask && (
          <button onClick={() => setIsAddingTask(true)}>Add New Task</button>
        )}
        {id == 1 && isAddingTask && (
          <form onSubmit={handleAddNewTask}>
            <input
              type="text"
              placeholder="New Task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsAddingTask(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </Paper>
  );
};

export default ColumnListItem;
