import React, { useEffect, useState, useContext } from "react";
import ColumnListItem from "./ColumnListItem";
import ChatDrawer from "./Chat/ChatDrawer";
import { Box, Typography, Paper } from "@mui/material";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { columnsContext } from "../providers/ColumnsProvider";
import { projectContext } from "../providers/ProjectProvider";
// import background from '../../public/lens-img-darkmode.jpeg';

const ColumnList = (props) => {
  const { columns, fetchTasks, onDragEnd } = useContext(columnsContext);
  const { project } = useContext(projectContext);
  console.log("am i getting the project?", project);

  // Start of new code

  useEffect(() => {
    fetchTasks();
  }, []);

  // End of new code

  console.log(columns);
  const columnArr = Object.entries(columns).map(([columnId, column]) => {
    return (
      <ColumnListItem
        key={columnId}
        id={columnId}
      // name={column.name}
      // tasks={column.tasks}
      />
    );
  });

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Box
        sx={{
          flex: 1,
          paddingTop: "8px",
          paddingBottom: "16px",
          bgcolor: "#eaeaee",
          // backgroundImage: `url(${background})`
          // change to theme colours
        }}
      >

        <div>
          <span>
            <h1>{project.name}</h1>
            <ChatDrawer />
          </span>
          <ul className="columnlist">
            {columnArr}
          </ul>
        </div>
      </Box>
    </DragDropContext>
  );
};

export default ColumnList;

//mock data
