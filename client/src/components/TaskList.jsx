import React from "react";
import TaskListItem from "./TaskListItem";
// import "../styles/TaskList.scss";
import { Box } from "@mui/material";

import { Droppable } from "react-beautiful-dnd";
import { useTheme } from '@mui/material/styles';

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#fee2e2" : "white",
  width: '100%'
});

const TaskList = (props) => {
  const { id, tasks } = props;
  const theme = useTheme();

  const taskArray = tasks.map((task, index) =>
    <TaskListItem
      key={task.id}
      id={task.id}
      name={task.name}
      task={task}
      index={index} />);

  return (
    <Box sx={{ justifyContent: 'center' }}>
      <Droppable key={id} droppableId={id} sx={{ justifyContent: 'center' }}>

        {(provided, snapshot) => {
          return (
            <ul className="task-list" {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {taskArray}
              {provided.placeholder}

            </ul>
          );
        }}
      </Droppable>
    </Box>
  );
};


export default TaskList;