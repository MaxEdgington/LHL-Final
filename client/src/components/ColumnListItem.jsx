import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task'; // Replace with your actual Task component.

const ColumnListItem = ({ column }) => {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {column.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default ColumnListItem;