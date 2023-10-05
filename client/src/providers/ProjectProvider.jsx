import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({}); //inital?
  //project is an object with all the keys from db,

  const addProject = async (formData) => {
    console.log("this is what projProvider-add gets:", formData);
    try {
      const newProject = await axios.post(`http://localhost:8080/api/projects/add`, formData);
      setProject(newProject.data);
    } catch (error) {
      console.error("Could not add project", error);
    }
  };

  const projectData = { project, addProject };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
