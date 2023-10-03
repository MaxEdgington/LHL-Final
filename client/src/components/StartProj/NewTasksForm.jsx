import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Box } from '@mui/material';

function NewTasksForm() {

  const handleDoneSubmit = (event) => {
    event.preventDefault();
    console.log("DONE event", event.target[0].value);
    // this function will need to query the db and add a task 
  };
  const handleMoreTasksClick = (event) => {
    event.preventDefault();
    SetView(3);
    console.log("MORE event", event);
    // this function will need to query the db and add a task 
  };

  return (
    <>
      <h1>Add a task to: projectName</h1>
      <form noValidate autoComplete="off" onSubmit={handleDoneSubmit}>
        <FormControl>
          <FormLabel>Task Name</FormLabel>
          <TextField color='primary' name="task-name"></TextField> {/* input id or something?*/}
          <FormLabel>Description Name</FormLabel>
          <TextField color='primary' name="task-description"></TextField>
          <Box>
            <h3> more tasks?</h3>
            <Button onClick={() => handleMoreTasksClick}>Enter More Tasks</Button> {/* other types than submit?*/}
            <Button type="submit" onClick={() => handleMoreTasksClick}>Finished</Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
}

export default NewTasksForm;
