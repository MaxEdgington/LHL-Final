import React from "react";
import "../styles/TaskListItem.scss";



const TaskListItem = (props) => {
  const { name } = props;

  return (
    <div>
      {name}
    </div>
  );
};

export default TaskListItem;