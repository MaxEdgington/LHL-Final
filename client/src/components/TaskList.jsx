import React from "react";
import TaskListItem from "./TaskListItem";
import "../styles/TaskList.scss";
import { Droppable } from "react-beautiful-dnd";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#df0405" : "white",
  // width: 250
});

const TaskList = (props) => {
  const { id, tasks } = props;

  const taskArray = tasks.map((task, index) =>
    <TaskListItem
      key={task.id}
      id={task.id}
      name={task.name}
      index={index} />);

  return (
    <div>
      <Droppable key={id} droppableId={id}>
        {(provided, snapshot) => (
          <ul className="task-list" {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {taskArray}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;