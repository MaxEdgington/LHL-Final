import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import ColumnList from './components/ColumnList';
import StartNewProject from './components/StartNewProject';
import NewTasksForm from './components/NewTasksForm';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

// import CustomThemeProvider from './providers/ThemeProvider';

import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(1);

  const SetView = (active) => { setActive(active); };

  const ActiveView = () => {
    switch (active) {
      case 1:
        return <ColumnList />;
      case 2:
        return <StartNewProject SetView={SetView} />;
      case 3:
        return <NewTasksForm />;
      default:
        return <ColumnList />;
    }
  };

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       light: '#e4e1df',
  //       main: '#dedad7',
  //       dark: '#9b9896',
  //       contrastText: '#fff',
  //     },
  //     secondary: {
  //       light: '#e53637',
  //       main: '#df0405',
  //       dark: '#9c0203',
  //       contrastText: '#000',
  //     },
  //   },
  // });

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
      <ThemeProvider theme={theme}>
        <Header SetView={SetView} />
        {ActiveView()}
      </ThemeProvider>
    </>
  );
}

export default App;
