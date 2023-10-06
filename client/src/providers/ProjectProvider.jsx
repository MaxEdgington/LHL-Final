import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({});
  //project is an object with all the keys from db,
  const [myProjects, setMyProjects] = useState([]);

  const addProject = async (formData) => {
    console.log("this is what projProvider-add gets:", formData);
    try {
      const response = await axios.post(`/api/projects/add`, formData);
      setProject(response.data);
    } catch (error) {
      console.error("Could not add project", error);
    }
  };

  const selectProject = async (name) => {
    try {
      const response = await axios.get(`/api/projects/${name}`);
      setProject(response.data);
    } catch (error) {
      console.error("Could not find project", error);
    }
  };

  const fetchMyProjects = async (id) => {
    try {
      const response = await axios.get(``); //whats the route?
      console.log(response);
      setMyProjects(response.data);
    } catch (error) {
      console.error("Could not find your projects", error);
    }
  };

  const projectData = { project, myProjects, addProject, selectProject, fetchMyProjects };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
