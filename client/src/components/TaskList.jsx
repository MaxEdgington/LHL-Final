import React from "react";
import TaskListItem from "./TaskListItem";
import "../styles/TaskList.scss";

// mock data
const taskMockArr = [
  {
    id: 1,
    name: "Project Planning and Ideation",
    description: "Define project objectives, create a timeline, and brainstorm unique features.",
    project_id: 1,
    due_date: 10 - 12 - 2023,
    status: 'To Do',
    assigned_user: 1
  },
  {
    id: 2,
    name: "Market Research",
    description: "Research pet and cat-related social media platforms for insights and opportunities.",
    project_id: 1,
    due_date: 11 - 12 - 2023,
    status: 'To Do',
    assigned_user: 2
  },
  {
    id: 3,
    name: "Technology Stack Selection",
    description: "Choose front-end and back-end technologies, including programming languages and databases.",
    project_id: 1,
    due_date: 12 - 12 - 2023,
    status: 'To Do',
    assigned_user: 3
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Create wireframes, mockups, and a visually appealing cat-themed interface.",
    project_id: 1,
    due_date: 13 - 12 - 2023,
    status: 'To Do',
    assigned_user: 1
  },
  {
    id: 5,
    name: "Front-End Development",
    description: "Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.",
    project_id: 1,
    due_date: 14 - 12 - 2023,
    status: 'To Do',
    assigned_user: 4
  },
  {
    id: 6,
    name: "Back-End Development",
    description: "Build server-side logic, implement authentication, and create APIs for key features.",
    project_id: 1,
    due_date: 15 - 12 - 2023,
    status: 'To Do',
    assigned_user: 6
  },
  {
    id: 7,
    name: "Database Setup and Management",
    description: "Design the database schema, set up the database server, and implement queries.",
    project_id: 1,
    due_date: 16 - 12 - 2023,
    status: 'To Do',
    assigned_user: 5
  },
  {
    id: 8,
    name: "Testing, Deployment, and Monitoring",
    description: "Test for bugs, deploy to a web server, and set up monitoring for performance.",
    project_id: 1,
    due_date: 17 - 12 - 2023,
    status: 'To Do',
    assigned_user: 1
  }
];

const TaskList = () => {

  const taskArray = taskMockArr.map(task => <TaskListItem key={task.id} name={task.name} />);

  return (
    <div>
      <h3>this is TaskList(for To Do columnlist)</h3>
      <ul>
        {taskArray}
      </ul>
    </div>
  );
};

export default TaskList;