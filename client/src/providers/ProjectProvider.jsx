import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({}); //inital?
  //project is an object with all the keys from db, same as res.data below

  const addProject = async (formData) => {
    console.log("this is what projProvider-add gets:", formData);
    try {
      console.log("Before axios.post");
      const newProject = await axios.post(`http://localhost:8080/api/projects/add`, formData);
      // console.log("what async stuff is keeping this from logging?", formData);
      setProject(newProject.data);
      console.log("After axios.post");
      console.log("After axios.post", formData.project_name);
      // return formData.project_name;
    } catch (error) {
      console.error("Could not add project", error);
    }
  };

  // const fetchProjectbyName = async (name) => {
  //   console.log("this is what projProvider-fetch gets:", name);
  //   try {
  //     const get = await axios.get(`http://localhost:8080/api/projects/${name}`);
  //     console.log("project form fetch", get.data);
  //     setProject(get.data);
  //   } catch (error) {
  //     console.error("Could not fetch projects", error);
  //   }
  // };


  // const projectAddFetchSet = async (formData) => {
  //   try {
  //     const resultFromAdd = await addProject(formData);
  //     const resultFromFetch = await fetchProjectbyName(resultFromAdd);
  //     // console.log("FETCH RESULT", resultFromFetch);
  //     // setProject(resultFromFetch); // will this work here? or need to be in async funct as well??
  //     // return project;
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }
  // };

  const projectData = { project, addProject };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
