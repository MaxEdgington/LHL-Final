import React, { useState } from "react";
import ColumnListItem from "./ColumnListItem";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";

//mock data
const columnData = [
  { id: 1, name: "To Do" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "In Review" },
  { id: 4, name: "Complete!" }
];

// const [tasks, setTasks] = useState();
// function handleOnDragEnd(result) {
// }

const ColumnList = (props) => {

  const columnArr = columnData.map((column, index) => <ColumnListItem key={column.id} name={column.name} />);

  return (
    <DragDropContext >
      {/* <DragDropContext onDragEnd={handleOnDragEnd}> */}
      <div>
        <h1>This is ColumnList</h1>
        <ul className="columnlist">
          {columnArr}

        </ul>
      </div>
    </ DragDropContext>
  );
};

export default ColumnList;