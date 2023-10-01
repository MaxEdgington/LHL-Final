import React from "react";
import ColumnListItem from "./ColumnListItem";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";


const ColumnList = (props) => {
  return (
    <DragDropContext>
      <div>
        <h1>This is ColumnList</h1>
        <ul className="columnlist">
          <ColumnListItem />
          {/* <ColumnListItem />
          <ColumnListItem /> */}
        </ul>
      </div>
    </ DragDropContext>
  );
};

export default ColumnList;