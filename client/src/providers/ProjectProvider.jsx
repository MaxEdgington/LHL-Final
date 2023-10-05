import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({}); //inital?
  //project is an object with all the keys from db, same as res.data below

  const fetchAndSetProjectbyName = async (req, res) => {
    try {
      await axios.get(`http://localhost:8080/api/projects/${req}`);
      console.log(`this is req ${req} and htis is res ${res}`);
      // need a query?
      console.log("project form fetch", res.data);
      // setProject(res.data);

    } catch (error) {
      console.error("Could not fetch projects", error);
    }
  };

  const addProject = async (formData) => {
    console.log("this is what projProvider gets:", formData);
    try {
      await axios.post(`http://localhost:8080/api/projects/add`, formData);
    } catch (error) {
      console.error("Could not add project", error);
    }
    console.log("is this just the name?", formData.project_name);
    fetchAndSetProjectbyName(formData.project_name);
    // setProject(res.data);
    // console.log("PROJECT", project);
  };

  const projectData = { project, fetchAndSetProjectbyName, addProject };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
