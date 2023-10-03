import React, { useEffect, useState } from "react";
import ColumnListItem from "./ColumnListItem";
import axios from "axios";
import ChatDrawer from "./ChatDrawer";
import { Box, Typography } from "@mui/material";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";

const taskMockArr = [
  {
    id: 1,
    name: "Project Planning and Ideation",
    description: "Define project objectives, create a timeline, and brainstorm unique features.",
    project_id: 1,
    due_date: "2023-10-12",
    // status: 'To Do',
    assigned_user: 1
  },
  {
    id: 2,
    name: "Market Research",
    description: "Research pet and cat-related social media platforms for insights and opportunities.",
    project_id: 1,
    due_date: "2023-10-13",
    // status: 'To Do',
    assigned_user: 2
  },
  {
    id: 3,
    name: "Technology Stack Selection",
    description: "Choose front-end and back-end technologies, including programming languages and databases.",
    project_id: 1,
    due_date: "2023-10-14",
    // status: 'To Do',
    assigned_user: 3
  },
  {
    id: 4,
    name: "UI/UX Design",
    description: "Create wireframes, mockups, and a visually appealing cat-themed interface.",
    project_id: 1,
    due_date: "2023-10-13",
    // status: 'To Do',
    assigned_user: 1
  },
  {
    id: 5,
    name: "Front-End Development",
    description: "Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.",
    project_id: 1,
    due_date: "2023-11-14",
    // status: 'To Do',
    assigned_user: 4
  },
  {
    id: 6,
    name: "Back-End Development",
    description: "Build server-side logic, implement authentication, and create APIs for key features.",
    project_id: 1,
    due_date: "2023-11-15",
    // status: 'To Do',
    assigned_user: 6
  },
  {
    id: 7,
    name: "Database Setup and Management",
    description: "Design the database schema, set up the database server, and implement queries.",
    project_id: 1,
    due_date: "2023-12-15",
    // status: 'To Do',
    assigned_user: 5
  },
  {
    id: 8,
    name: "Testing, Deployment, and Monitoring",
    description: "Test for bugs, deploy to a web server, and set up monitoring for performance.",
    project_id: 1,
    due_date: "2023-12-17",
    // status: 'To Do',
    assigned_user: 1
  }
];

const initialColumnData = {
  1: { name: "To Do", tasks: [] },
  2: { name: "In Progress", tasks: [] },
  3: { name: "In Review", tasks: [] },
  4: { name: "Complete!", tasks: [] }
};

const ColumnList = (props) => {

  const [columns, setColumns] = useState(initialColumnData);

  
  // Start of new code 

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      console.log("Tasks received from server:", res.data); 

      // ... rest of your logging and fetching logic ...

      // Creating a new column state based on the fetched tasks
      // setColumns(prevColumns =>
      //   Object.keys(prevColumns).reduce((acc, columnId) => {
      //     acc[columnId] = {
      //       ...prevColumns[columnId],
      //       tasks: fetchTasks[columnId] || [],
      //     };
      //     return acc;
      //   }, {})
      // );

      setColumns(prevColumns => {
        // console.log("Mentor Session: Looking for prevColumns", prevColumns[0])
        // prevColumns[0].tasks = res.data
        let newTasks = {}
        return {
          ...prevColumns, 
          [1]:{
            ...prevColumns[1], 
            tasks:res.data
          }}
      } )

      console.log("After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  fetchTasks();
}, []);

// End of new code 



  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destTasks = [...destColumn.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks
        }
      });
    }
  };

  console.log(columns);
  const columnArr = Object
    .entries(columns)
    .map(([columnId, column]) => {
      return <ColumnListItem 
      key={columnId} 
      id={columnId} 
      name={column.name} 
      tasks={column.tasks}/>
  }



  );

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
      <Box
        sx={{
          flex: 1,
          paddingTop: "8px",
          paddingBottom: "16px",
          bgcolor: "#eaeaee"
          // change to theme colours
        }}
      >
        <div>
          <span>
            <h1>Project 1</h1> {/* this needs to also come from the backend */}
            <ChatDrawer />
          </span>
          <ul className="columnlist">
            {columnArr}
          </ul>
        </div>
      </Box>
    </ DragDropContext>
  );
};

export default ColumnList;



//mock data
