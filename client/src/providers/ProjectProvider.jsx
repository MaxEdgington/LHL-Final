import { createContext, useState, useContext } from "react";
import axios from "axios";
// import { userContext } from "./UserProvider";
import { useNavigate } from "react-router-dom";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({});
  //project is an object with all the keys from db,
  const [myProjects, setMyProjects] = useState([]);
  const navigate = useNavigate();

  const addProject = async (formData) => {
    console.log("this is what projProvider-add gets:", formData);
    try {
      const response = await axios.post(`/api/projects/add`, formData);
      console.log("is this the whole project or the id", response.data);
      setProject(response.data);
      return response.data; // Return the new project data
    } catch (error) {
      console.error("Could not add project", error);
      throw error; // Propagate the error so you can handle it in the calling function
    }
  };

  const selectProject = async (id) => {
    const idNum = parseInt(id);
    try {
      console.log("selectProjects is running", idNum);
      const response = await axios.get(`/api/projects/${idNum}`);
      console.log("can i set the proj?", response.data);
      setProject(response.data);
    } catch (error) {
      console.error("Could not find project", error);
    }
  };

  const fetchMyProjects = async (id) => {
    try {
      console.log("fetchMyProjects is running");
      const response = await axios.get(`/api/projects/myprojects/${id}`);
      setMyProjects(response.data);
    } catch (error) {
      console.error("Could not find your projects", error.message);
    }
  };

  const projectData = {
    project,
    setProject,
    myProjects,
    addProject,
    selectProject,
    fetchMyProjects,
  };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
