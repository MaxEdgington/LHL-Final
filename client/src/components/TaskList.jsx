import React from "react";
import TaskListItem from "./TaskListItem";
import "../styles/TaskList.scss";

const TaskList = (props) => {

  return (
    <div>
      <h3>this is TaskList(for To Do columnlist)</h3>
      <ul>
        <TaskListItem />
      </ul>
    </div>
  )
}

export default TaskList;