import { createContext, useState, useEffect } from "react";

export const columnsContext = createContext();

export default function ColumnsProvider(props) {
  const initialColumnData = {
    1: { name: "To Do", tasks: [] },
    2: { name: "In Progress", tasks: [] },
    3: { name: "In Review", tasks: [] },
    4: { name: "Complete!", tasks: [] },
  };

  const [columns, setColumns] = useState(initialColumnData);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/tasks");
        console.log("Tasks received from server:", res.data);
        setColumns((prevColumns) => {
          let newTasks = {};
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

    fetchTasks();
  }, []);

  const columnData = { columns };

  return (
    <columnsContext.Provider value={columnData}>
      {props.children}
    </columnsContext.Provider>
  );
}
