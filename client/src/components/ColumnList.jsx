import React, { useEffect, useState, useContext } from "react";
import ColumnListItem from "./ColumnListItem";
import axios from "axios";
import ChatDrawer from "./ChatDrawer";
import { Box, Typography } from "@mui/material";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { columnsContext } from "../providers/ColumnsProvider";

const ColumnList = (props) => {
  const { columns, fetchTasks, onDragEnd } = useContext(columnsContext);

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
        name={column.name}
        tasks={column.tasks}
      />
    );
  });

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Box
        sx={{
          flex: 1,
          paddingTop: "8px",
          paddingBottom: "16px",
          bgcolor: "#eaeaee",
          // change to theme colours
        }}
      >
        <div>
          <span>
            <h1>Project 1</h1> {/* this needs to also come from the backend */}
            <ChatDrawer />
          </span>
          <ul className="columnlist">{columnArr}</ul>
        </div>
      </Box>
    </DragDropContext>
  );
};

export default ColumnList;

//mock data
