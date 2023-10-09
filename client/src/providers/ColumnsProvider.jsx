import { createContext, useState, useContext } from "react";
import axios from "axios";
import { projectContext } from "./ProjectProvider";

export const columnsContext = createContext();

export default function ColumnsProvider(props) {
  const { project, setProject } = useContext(projectContext);

  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] },
  };

  const [columns, setColumns] = useState(initialColumnData);

  const fetchTasks = async (projectparam = project.id) => {
    try {
      const res = await axios.get("/api/tasks");
      const projectData = res.data.filter(
        (task) => task.project_id === parseInt(projectparam)
      );

      const todoTasks = projectData.filter((task) => task.status === "1");
      const todoTasksSorted = todoTasks.sort((a, b) => a.index - b.index);

      const inProgressTasks = projectData.filter((task) => task.status === "2");
      const inProgressTasksSorted = inProgressTasks.sort(
        (a, b) => a.index - b.index
      );

      const inReviewTasks = projectData.filter((task) => task.status === "3");
      const inReviewTasksSorted = inReviewTasks.sort(
        (a, b) => a.index - b.index
      );

      const completedTasks = projectData.filter((task) => task.status === "4");
      const completedTasksSorted = completedTasks.sort(
        (a, b) => a.index - b.index
      );

      // Update columns state with fetched tasks
      setColumns({
        1: { ...columns[1], tasks: todoTasksSorted },
        2: { ...columns[2], tasks: inProgressTasksSorted },
        3: { ...columns[3], tasks: inReviewTasksSorted },
        4: { ...columns[4], tasks: completedTasksSorted },
      });

      // console.log("4 After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  // Add a single new task with title
  const addNewTask = async (taskTitle) => {
    try {
      const response = await axios.post("/api/tasks/add", {
        title: taskTitle,
        project_id: project.id,
      });

      // Update the local state with the new task
      setColumns((prevColumns) => ({
        ...prevColumns,
        1: {
          ...prevColumns[1],
          tasks: [...prevColumns[1].tasks, response.data],
        },
      }));
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  // Fetch AI-generated tasks, process them and add to database
  const addGeneratedTasks = async (
    projectDescription,
    projectName,
    projectDueDate
  ) => {
    console.log(projectDescription, projectName, projectDueDate);
    try {
      // const response = {
      //   data: {
      //     generatedText:
      //       "It seems the project description was not provided properly, and is instead showing up as [object Object]. However, I'll provide 25 generic tasks for web development in JavaScript or TypeScript with SQL database.\n\n1. Setup Development Environment: Install necessary tools, IDEs and libraries for project setup.\n2. Database Configuration: Set up and configure SQL database and ensure connectivity.\n3. Plan Database Structure: Come up with a comprehensive data schema that suits the project requirements.\n4. Create Database Tables: Implement the data schemas in SQL, creating necessary tables and relationships.\n5. Indexing Critical Fields: Decide on and implement indexes on database fields for optimized queries.\n6. Setup Client-Server Communication: Establish communication channels between the client-side and server-side.\n7. Design Interface Mockups: Sketch the interface of the application to be built.\n8. Design Interface in Code: Convert mockups to code using HTML & CSS or other styling frameworks.\n9. Implement Basic User Interface: Implement the static parts of the UI with HTML and CSS.\n10. Dynamic Content Loading: Implement dynamic content updates using JavaScript or TypeScript.\n11. Implement Basic CRUD Operations: Implement the ability to create, read, update, and delete entries in the database.\n12. Implement Form Validation: Add validation checks to data input forms.\n13. Implement User Authentication: Design and implement user authentication system.\n14. Implement User Authorization: Add user roles and their privilege management.\n15. Setup Error Handling and Reporting: Design system for catching, reporting and handling exceptions.\n16. Implement Data Filtering: Add functionality to filter data on the client-side.\n17. Session Management: Implement the management of user sessions.\n18. Implement Pagination: Add functionality to split long lists of data into separate pages.\n19. Implement Sorting: Add functionality to sort displayed data.\n20. Create User Profile: Design and implement user profile view/edit.\n21. Implement Search Functionality: Implement the ability for users to search data.\n22. Development of API Endpoints: Develop API endpoints that the front-end can interact with.\n23. Implement Logging: Incorporate logging of key actions for troubleshooting and auditing.\n24. Application Testing: Plan and execute tests to ensure application correctness and performance optimization.\n25. Deploy Application: Deploy the application to the production environment after successful testing.\n\nNote: This generated list is very generic. After receiving a more specific project description, these tasks can be tailored more accurately.",
      //   },
      // };
      const response = await axios.post("http://localhost:8080/openai", {
        description: projectDescription,
      });
      console.log(response.data);

      const generatedTasksText = response.data.generatedText.trim().split("\n");
      const tasksToAdd = generatedTasksText
        .filter((taskText) => taskText.includes(": ")) // Filter out lines without ": "
        .map((taskText) => {
          const [taskTitle, taskDescription] = taskText.split(": ");
          return {
            title: taskTitle.trim(),
            description: taskDescription.trim(),
          };
        });

      // Send all tasks at once to the batch endpoint
      const addedTasks = await axios.post(
        "http://localhost:8080/api/tasks/add-batch",
        {
          tasks: tasksToAdd,
          project: { projectName, projectDescription, projectDueDate },
        }
      );

      // Update the local state with the new tasks
      setColumns((prevColumns) => ({
        ...prevColumns,
        1: {
          ...prevColumns[1],
          tasks: [...prevColumns[1].tasks, ...addedTasks.data],
        },
      }));
    } catch (error) {
      console.error("Error fetching tasks from server:", error);
    }
  };

  // Delete a task by its ID
  const handleDelete = async (taskId) => {
    try {
      await axios.post(`/api/tasks/${taskId}/delete`);
      // Update local state by removing the deleted task
      const newColumns = Object.entries(columns).reduce(
        (acc, [key, column]) => {
          return {
            ...acc,
            [key]: {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            },
          };
        },
        {}
      );

      setColumns(newColumns);
    } catch (error) {
      console.error("Could not delete tasks", error);
    }
  };

  // Handle drag and drop of tasks across columns
  const onDragEnd = async (result) => {
    // ... existing logic

    if (!result.destination) return;

    console.log("result:", result);
    const { source, destination } = result;
    const taskId = result.draggableId;
    console.log("taskId:", taskId);
    // taskId is a string

    if (source.droppableId !== destination.droppableId) {
      try {
        await axios.post(`/api/tasks/${Number(taskId)}`, {
          new_column_status: destination.droppableId,
          // destination.droppableId is a string
          new_task_index: destination.index,
          // destination.index is INT
        });

        // console.log("destination.index:", destination.index)

        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceTasks = [...sourceColumn.tasks];
        const destTasks = [...destColumn.tasks];
        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
        // add axio post request here to change the tasks table's status colomn
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
          [destination.droppableId]: {
            ...destColumn,
            tasks: destTasks,
          },
        });
      } catch (error) {
        console.error("Could not drag tasks", error);
      }
    } else {
      try {
        await axios.post(`/api/tasks/${Number(taskId)}/onecolumn`, {
          new_task_index: destination.index,
          // destination.index is INT
        });

        const column = columns[source.droppableId];
        const copiedTasks = [...column.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        // copiedTasks.map(task => task.index = destination.index)

        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            tasks: copiedTasks,
          },
        });
      } catch (error) {
        console.error("Could not drag tasks", error);
      }
    }
  };

  const columnData = {
    columns,
    fetchTasks,
    onDragEnd,
    addNewTask,
    handleDelete,
    addGeneratedTasks,
  };

  return (
    <columnsContext.Provider value={columnData}>
      {props.children}
    </columnsContext.Provider>
  );
}
