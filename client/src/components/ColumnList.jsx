import React from "react";
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


const ColumnList = (props) => {

  return (
    <DragDropContext>
      <div>
        <h1>This is ColumnList</h1>
        <ul className="columnlist">
          <ColumnListItem />

        </ul>
      </div>
    </ DragDropContext>
  );
};

export default ColumnList;