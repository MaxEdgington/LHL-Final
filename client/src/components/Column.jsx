import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

function Column({ column }) {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.droppableProps} 
          className="column" // Applied class here
        >
          <h2>{column.name}</h2> {/* Assuming that your column object has a name property */}
          <div className="tasks">
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;