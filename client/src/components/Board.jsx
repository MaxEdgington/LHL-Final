// Board.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const Board = () => {
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/columns'); // adjust the URL accordingly
        const data = await res.json();
        setColumns(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    // You will need to write the logic to reorder columns and tasks based on the drag-and-drop result
    // After reordering, update the columns state using setColumns
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columns.map(column => <Column key={column.id} column={column} />)}
    </DragDropContext>
  );
};

export default Board; // Fixed export here

// Here’s a cleaner, revised version of Board.jsx. This assumes that you are passing columns and onDragEnd as props from App.jsx, and hence there is no need to make an API call or maintain a local state for columns in Board.jsx.