import React, { useEffect, useState, useContext } from "react";
import ColumnListItem from "./ColumnListItem";
import axios from "axios";
import ChatDrawer from "./ChatDrawer";
import { Box, Typography } from "@mui/material";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { columnsContext } from "../providers/ColumnsProvider" 

const ColumnList = (props) => {
  const { columns, fetchTasks } = useContext(columnsContext)
 

  
  // Start of new code 

  useEffect(() => {
  

      console.log("After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  fetchTasks();
}, []);

// End of new code 



  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks
        }
      });
    }
  };

  console.log(columns);
  const columnArr = Object
    .entries(columns)
    .map(([columnId, column]) => {
      return <ColumnListItem 
      key={columnId} 
      id={columnId} 
      name={column.name} 
      tasks={column.tasks}/>
  }



  );

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Box
        sx={{
          flex: 1,
          paddingTop: "8px",
          paddingBottom: "16px",
          bgcolor: "#eaeaee"
          // change to theme colours
        }}
      >
        <div>
          <span>
            <h1>Project 1</h1> {/* this needs to also come from the backend */}
            <ChatDrawer />
          </span>
          <ul className="columnlist">
            {columnArr}
          </ul>
        </div>
      </Box>
    </ DragDropContext>
  );
};

export default ColumnList;



//mock data
