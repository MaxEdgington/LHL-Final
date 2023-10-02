import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Task({ task, index }) {
  const { id, name, description, due_date, status, assigned_user } = task;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task" // you can style your task with a css class
        >
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Due Date: {due_date}</p>
          <p>Status: {status}</p>
          <p>Assigned User ID: {assigned_user}</p>
        </div>
      )}
    </Draggable>
  );
}

export default Task;