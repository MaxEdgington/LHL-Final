import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ColumnListItem from './ColumnListItem';
import "../styles/ColumnList.scss";

const ColumnList = ({ columns, onDragEnd  }) => {

  const onDragEnd = (result) => {
    // Handle the drag end result here.
    // You can update the local state or make API calls to update the server state.
  };

  return (
    <div>
      <h1>This is ColumnList</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <ul className="columnlist">
          {columns.map(column => (
            <ColumnListItem key={column.id} column={column} />
          ))}
        </ul>
      </DragDropContext>
    </div>
  )
}

export default ColumnList;