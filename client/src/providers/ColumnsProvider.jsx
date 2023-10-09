import { createContext, useState, useContext } from "react";
import axios from "axios";
import { projectContext } from "./ProjectProvider";


export const columnsContext = createContext();

export default function ColumnsProvider(props) {
  const { project } = useContext(projectContext);

  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] },
  };

  const [columns, setColumns] = useState(initialColumnData);


  const fetchTasks = async () => {  //need to change this to fetch tasks of PROJECT
    try {
      const res = await axios.get("/api/tasks");
      console.log("1 ALL Tasks received from server:", res.data);

      console.log("2 do i have a project", project);
      const projectData = res.data.filter((task) => task.project_id === project.id);
      console.log("3 can i filter", projectData);

      const todoTasks = projectData.filter((task) => task.status === "1");
      const todoTasksSorted = todoTasks.sort((a, b) => a.index - b.index);

      const inProgressTasks = projectData.filter((task) => task.status === "2");
      const inProgressTasksSorted = inProgressTasks.sort((a, b) => a.index - b.index);

      const inReviewTasks = projectData.filter((task) => task.status === "3");
      const inReviewTasksSorted = inReviewTasks.sort((a, b) => a.index - b.index);

      const completedTasks = projectData.filter((task) => task.status === "4");
      const completedTasksSorted = completedTasks.sort((a, b) => a.index - b.index);

      setColumns({
        1: { ...columns[1], tasks: todoTasksSorted },
        2: { ...columns[2], tasks: inProgressTasksSorted },
        3: { ...columns[3], tasks: inReviewTasksSorted },
        4: { ...columns[4], tasks: completedTasksSorted },
      });

      console.log("4 After data transformation:", columns);
    } catch (error) {
      console.error("Could not fetch tasks", error);
    }
  };

  const addNewTask = async (taskTitle) => {
    // give this form params from form
    console.log("do i have the data", project);
    console.log("do i have the data", taskTitle);
    try {
      const response = await axios.post("/api/tasks/add", {
        title: taskTitle, project_id: project.id
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

  const handleDelete = async (taskId) => {
    // console.log("tasks No:", taskId)
    try {
      await axios.post(`/api/tasks/${taskId}/delete`);

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

  const saveEditedTask = async(taskId, Editedtask) => {
    try {
      await axios.post(`/api/tasks/${Number(taskId)}/edit`, {
        Editedtask: Editedtask
      });

      const newColumns = Object.entries(columns).reduce(
        (acc, [key, column]) => {
          return {
            ...acc,
            [key]: {
              ...column,
              tasks: column.tasks.map(task => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    name: Editedtask[0],
                    description: Editedtask[1],
                    due_date: Editedtask[2]
                  }
                }
                return task;
              })
            }
          }
        }, {}
      )

      setColumns(newColumns)

    } catch (error) {
      console.error("Could not edit tasks", error);
    }
  }

  const onDragEnd = async (result) => {
    // it only updates the dragged card, it does not update the index of other cards that are also moved passively

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
          new_task_index: destination.index
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
          new_task_index: destination.index
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
    saveEditedTask
  };

  return (
    <columnsContext.Provider value={columnData}>
      {props.children}
    </columnsContext.Provider>
  );
}
