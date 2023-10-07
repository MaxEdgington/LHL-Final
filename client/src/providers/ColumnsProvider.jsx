import { createContext, useState } from "react";
import axios from "axios";

export const columnsContext = createContext();

export default function ColumnsProvider(props) {
  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] },
  };

  const [columns, setColumns] = useState(initialColumnData);

  // Fetch tasks and categorize them by their status
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");

      const todoTasks = res.data.filter((task) => task.status === "1");
      const inProgressTasks = res.data.filter((task) => task.status === "2");
      const inReviewTasks = res.data.filter((task) => task.status === "3");
      const completedTasks = res.data.filter((task) => task.status === "4");

      // Update columns state with fetched tasks
      setColumns({
        1: { ...columns[1], tasks: todoTasks },
        2: { ...columns[2], tasks: inProgressTasks },
        3: { ...columns[3], tasks: inReviewTasks },
        4: { ...columns[4], tasks: completedTasks },
      });
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  // Add a single new task with title
  const addNewTask = async (taskTitle) => {
    try {
      const response = await axios.post("http://localhost:8080/api/tasks/add", {
        title: taskTitle,
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
  const addGeneratedTasks = async (description) => {
    try {
      const response = await axios.post("http://localhost:8080/openai", {
        description,
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
      await axios.post(`http://localhost:8080/api/tasks/${taskId}/delete`);

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
  const onDragEnd = (result) => {
    // ... existing logic
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
