import React from "react";
import TaskList from "./TaskList";
import "../styles/ColumnListItem.scss";

const ColumnListItem = (props) => {
  const { name } = props;
  return (

    <div>
      <h2>This is ColumListItem {name}</h2>


      <TaskList />


    </div>

  );
};

export default ColumnListItem;