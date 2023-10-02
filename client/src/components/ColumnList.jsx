import React, { useEffect, useState } from "react";
import ColumnListItem from "./ColumnListItem";
import axios from "axios";
import "../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";



const ColumnList = (props) => {
  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] }
  };

  const [columns, setColumns] = useState(initialColumnData);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/tasks");
        console.log("Tasks received from server:", res.data); // Log data here
        const fetchedTasks = res.data.reduce((acc, task) => {
          acc[task.status] = [...(acc[task.status] || []), task];
          return acc;
        }, {});

        setColumns((prevColumns) =>
          Object.keys(prevColumns).reduce((acc, columnId) => {
            acc[columnId] = {
              ...prevColumns[columnId],
              tasks: fetchedTasks[columnId] || [],
            };
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Could not fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const onDragEnd = (result) => {
    if(!result.destination) return;
    const { source, destination} = result;
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

  const columnArr = Object.entries(columns).map(([columnId, column], index) => <ColumnListItem key={columnId} id={columnId} name={column.name} tasks={column.tasks}/>
  );

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
     
    <div>
        <h1>Project 1</h1>
        <ul className="columnlist">
          {columnArr}
        </ul>
    </div>
    </ DragDropContext>
  );
};

export default ColumnList;



//mock data

// const taskMockArr = [
//   {
//     id: 1,
//     name: "Project Planning and Ideation",
//     description: "Define project objectives, create a timeline, and brainstorm unique features.",
//     project_id: 1,
//     due_date: 10 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 1
//   },
//   {
//     id: 2,
//     name: "Market Research",
//     description: "Research pet and cat-related social media platforms for insights and opportunities.",
//     project_id: 1,
//     due_date: 11 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 2
//   },
//   {
//     id: 3,
//     name: "Technology Stack Selection",
//     description: "Choose front-end and back-end technologies, including programming languages and databases.",
//     project_id: 1,
//     due_date: 12 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 3
//   },
//   {
//     id: 4,
//     name: "UI/UX Design",
//     description: "Create wireframes, mockups, and a visually appealing cat-themed interface.",
//     project_id: 1,
//     due_date: 13 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 1
//   },
//   {
//     id: 5,
//     name: "Front-End Development",
//     description: "Develop the front-end using HTML, CSS, and JavaScript with relevant frameworks.",
//     project_id: 1,
//     due_date: 14 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 4
//   },
//   {
//     id: 6,
//     name: "Back-End Development",
//     description: "Build server-side logic, implement authentication, and create APIs for key features.",
//     project_id: 1,
//     due_date: 15 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 6
//   },
//   {
//     id: 7,
//     name: "Database Setup and Management",
//     description: "Design the database schema, set up the database server, and implement queries.",
//     project_id: 1,
//     due_date: 16 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 5
//   },
//   {
//     id: 8,
//     name: "Testing, Deployment, and Monitoring",
//     description: "Test for bugs, deploy to a web server, and set up monitoring for performance.",
//     project_id: 1,
//     due_date: 17 - 12 - 2023,
//     // status: 'To Do',
//     assigned_user: 1
//   }
// ];