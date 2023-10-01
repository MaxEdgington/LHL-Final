import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from './components/Header';
import ColumnList from './components/ColumnList';

import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
      <h1>Lens project</h1>
      {error && <p>Error loading data: {error.message}</p>}
      {data ? (
        <div>
          <h2>Data from the server:</h2>
          <p>{data.users[0].email}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      <Header />
      <ColumnList />

    </>
  );
}

export default App;
