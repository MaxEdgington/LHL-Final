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
// mock data
const taskMockArr = [
  {
    id: 1,
    name: "Project Planning and Ideation",
    description: "Define project objectives, create a timeline, and brainstorm unique features.",
    project_id: 1,
    due_date: '10-12-2023',
    status: 1,
    assigned_user: 1
  },
  {
    id: 2,
    name: "Market Research",
    description: "Research pet and cat-related social media platforms for insights and opportunities.",
    project_id: 1,
    due_date: '11-12-2023',
    status: 1,
    assigned_user: 2
  },
  {
    id: 3,
    name: "Technology Stack Selection",
    description: "Choose front-end and back-end technologies, including programming languages and databases.",
    project_id: 1,
    due_date: '12-12-2023',
    status: 1,
    assigned_user: 3
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Create wireframes, mockups, and a visually appealing cat-themed interface.",
    project_id: 1,
    due_date: '13-12-2023',
    status: 1,
    assigned_user: 1
  },
  {
    id: 5,
    name: "Front-End Development",
    description: "Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.",
    project_id: 1,
    due_date: '14-12-2023',
    status: 1,
    assigned_user: 4
  },
  {
    id: 6,
    name: "Back-End Development",
    description: "Build server-side logic, implement authentication, and create APIs for key features.",
    project_id: 1,
    due_date: '15-12-2023',
    status: 1,
    assigned_user: 6
  },
  {
    id: 7,
    name: "Database Setup and Management",
    description: "Design the database schema, set up the database server, and implement queries.",
    project_id: 1,
    due_date: '16-12-2023',
    status: 2,
    assigned_user: 5
  },
  {
    id: 8,
    name: "Testing, Deployment, and Monitoring",
    description: "Test for bugs, deploy to a web server, and set up monitoring for performance.",
    project_id: 1,
    due_date: '17-12-2023',
    status: 2,
    assigned_user: 1
  }
];


const ColumnList = () => {
  const [tasksState, setTasks] = useState(taskMockArr);
  // const columnArr = columnData.map((column, index) => <ColumnListItem key={column.id} name={column.name} tasksState={tasksState} />);

  const handleOnDragEnd = (result) => {
    const items = Array.from(tasksState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
    console.log("this is the context result", result);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} >
      {/* <DragDropContext onDragEnd={handleOnDragEnd}> */}
      <div>
        <h1>This is ColumnList</h1>
        <ul className="columnlist">
          <ColumnListItem key={1} id={1} name={'To Do'} filteredTasks={tasksState.filter(task => task.status === 1)} />
          <ColumnListItem key={2} id={2} name={'In Progress'} filteredTasks={tasksState.filter(task => task.status === 2)} />
          <ColumnListItem key={3} id={3} name={'In Review'} filteredTasks={tasksState.filter(task => task.status === 3)} />
          <ColumnListItem key={4} id={4} name={'Completed'} filteredTasks={tasksState} />
          {/* column 1, 2 and 3 show the correct tasks from data, but dont drop propperly, column 4 is not filtered but does have drag and drop working */}
        </ul>
      </div>
    </ DragDropContext>
  );
};

export default ColumnList;