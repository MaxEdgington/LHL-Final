import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Box } from '@mui/material';



function NewProjectForm(props) {
  const { SetView } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit event", event.target[0].value);
    // this function will need to query the db and add to project table.
  };

  return (
    <>
      <h1>Start a New Project</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <TextField color='primary'></TextField>
          <Box>
            <h3>Would you like to use our Lens AI to help you get started?</h3>
            <Button >Yes, use Lens AI</Button> {/* this button will need to open a different Form*/}
            <Button type="submit" onClick={() => SetView(3)}>No, I'll create Tasks myself</Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
}

export default NewProjectForm;