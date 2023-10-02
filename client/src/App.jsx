import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Board from './components/Board'; // Import Board Component
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]); // State to manage columns and tasks
  const [error, setError] = useState(null);

  const onDragEnd = (result) => {
    // Your logic to re-order the columns/tasks based on the drag and drop and then update the state.
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const columnsResponse = await axios.get('http://localhost:8080/api/columns');
      setColumns(columnsResponse.data);
    } catch (error) {
      console.error('Error fetching the columns data', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      setError(error);
    }
  };
  fetchData();
}, []);

  return (
    <>
      <h1>Lens project</h1>
      {error && <p>Error loading data: {error.message}</p>}
      {data ? (
        <div>
          <h2>Data from the server:</h2>
          <p>{data.users[0].email}</p> 
          {/* Assuming that the data object has a users array with at least one user having an email property */}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      <Header />
      {columns.length > 0 ? <Board columns={columns} onDragEnd={onDragEnd} /> : <p>Loading columns...</p>}
    </>
  );
}

export default App;