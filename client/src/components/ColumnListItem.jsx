import React from "react";
import TaskList from "./TaskList";
import "../styles/ColumnListItem.scss";

const ColumnListItem = (props) => {
  const { id, name, tasks } = props;

  console.log("ColumnListItem props:", props); // Check the props
  console.log("Tasks received:", tasks); // Check the tasks data

  return (

    <div className="column">
      <h2>{name}</h2>
      <TaskList id={id} tasks={tasks}/>
      {id==1 && <button>Add New Task</button>}
        </div>

  );
};

export default ColumnListItem;