import React from "react";
import TaskList from "./TaskList";
import "../styles/ColumnListItem.scss";

const ColumnListItem = (props) => {
  const { id, name, tasks } = props;
  return (

    <div className="column">
      <h2>{name}</h2>
      <TaskList id={id} tasks={tasks}/>
    </div>

  );
};

export default ColumnListItem;