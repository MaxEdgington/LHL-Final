import React, { useState, useContext } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import axios from "axios";
import { Box } from "@mui/material";

import Header from "./components/Header";
import ColumnList from "./components/ColumnList";
import StartNewProject from "./components/StartProject/StartNewProject";
// import NewTasksForm from "./components/NewTasksForm";
import Login from "./components/User/Login";
import MyProjectsList from "./components/User/MyProjectsList";
import ErrorPage from "./components/ErrorPage";
import background from '../public/lots-of-lenses.jpg';

import UserProvider from "./providers/UserProvider";
import ColumnsProvider from "./providers/ColumnsProvider";
import ProjectProvider from "./providers/ProjectProvider";
// import { columnsContext } from "./providers/ColumnsProvider";
// import CustomThemeProvider from './providers/ThemeProvider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(4);

  // const setView = (active) => {
  //   setActive(active);
  // };

  // const ActiveView = () => {
  //   switch (active) {
  //     case 1:
  //       return <ColumnList />;
  //     case 2:
  //       return <StartNewProject setView={setView} />;
  //     case 3:
  //       return <NewTasksForm />; //this is not being used afterall
  //     case 4:
  //       return <Login setView={setView} />;
  //     case 5:
  //       return <MyProjectsList setView={setView} />;
  //     default:
  //       return <Login />;
  //   }
  // };

  <Link to="/myProjects">My Projects</Link>;

  // useEffect(() => {
  //   const url = 'http://localhost:8080/cats';

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(url);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching the data', error);
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <UserProvider >
        <Header />

        <ProjectProvider>
          <ColumnsProvider>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myProjects" element={<MyProjectsList />} />
              {/* <Route path="/projectboard" element={<ColumnList />} /> */}
              <Route path='/projectboard/:id' element={<ColumnList />} />
              <Route path="/newProject" element={<StartNewProject />} />
              <Route path="*" element={<ErrorPage />} />

              {/* YULI - something like this maybe??? */}
              {/* <Route path='/task/:id' element={???} /> */}
            </Routes>

          </ColumnsProvider>
        </ProjectProvider>
      </UserProvider>

    </>
  );
}

export default App;
