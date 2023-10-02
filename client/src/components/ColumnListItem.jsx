import React from "react";
import TaskList from "./TaskList";
import "../styles/ColumnListItem.scss";

const ColumnListItem = (props) => {
  const { name, filteredTasks } = props;
  return (

    <div>
      <h2>This is ColumListItem {name}</h2>


      <TaskList filteredTasks={filteredTasks} />
      <div> There will also be a new Task Button Here</div>


    </div >

  );
};

export default ColumnListItem;