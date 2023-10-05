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

  // useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      console.log("Tasks received from server:", res.data);
      setColumns((prevColumns) => {
        return {
          ...prevColumns,
          [1]: {
            ...prevColumns[1],
            tasks: res.data,
          },
        };
      });

      console.log("After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  const addNewTask = async (taskTitle) => {
    // give this form params from form
    try {
      const response = await axios.post("http://localhost:8080/api/tasks/add", {
        title: taskTitle, // You can set a default title for now
      });
      console.log("New task added:", response.data);

      // Now, you should update your local state to reflect this new task:
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

  // }, []);

  const handleDelete = async (taskId) => {
    // console.log("tasks No:", taskId)
    try {
      await axios.post(`http://localhost:8080/api/tasks/${taskId}/delete`);

      console.log("*****deleted task id:", taskId);
      console.log("Columns data here:", columns);
      
      // get an array of key-column objects, use .reduce to create a new columns object which removes the task whose id it taskId
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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log("result.destination:",result.destination)
    const { source, destination } = result;
    console.log("result:",result)
    if (source.droppableId !== destination.droppableId) {
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
    } else {
      const column = columns[source.droppableId];
      const copiedTasks = [...column.tasks];
      const [removed] = copiedTasks.splice(source.index, 1);
      copiedTasks.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks,
        },
      });
    }
  };

  const columnData = {
    columns,
    fetchTasks,
    onDragEnd,
    addNewTask,
    handleDelete,
  };

  return (
    <columnsContext.Provider value={columnData}>
      {props.children}
    </columnsContext.Provider>
  );
}
