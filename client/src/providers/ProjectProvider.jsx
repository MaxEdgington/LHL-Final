import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({}); //inital?

  const fetchProject = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/projects");
      // need a query?
      console.log("project form fetch", res.data);
      setProject(res.data);

    } catch (error) {
      console.error("Could not fetch projects", error);
    }
  };

  const projectData = { project, fetchProject };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
