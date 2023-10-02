import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import ColumnList from './components/ColumnList';

import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  const theme = createTheme({
    palette: {
      primary: {
        light: '#e4e1df',
        main: '#dedad7',
        dark: '#9b9896',
        contrastText: '#fff',
      },
      secondary: {
        light: '#e53637',
        main: '#df0405',
        dark: '#9c0203',
        contrastText: '#000',
      },
    },
  });

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
      {/* <h1>Lens project</h1>
      {error && <p>Error loading data: {error.message}</p>}
      {data ? (
        <div>
          <h2>Data from the server:</h2>
          <p>{data.users[0].email}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )} */}
      <ThemeProvider theme={theme}>
        <Header />
        <ColumnList />
      </ThemeProvider>
    </>
  );
}

export default App;
