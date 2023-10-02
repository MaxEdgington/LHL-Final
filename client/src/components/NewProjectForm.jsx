import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';



function NewProjectForm() {

  return (
    <>
      <h1>Start a New Project</h1>
      <form noValidate autoComplete="off">
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <TextField></TextField>
          <h3>Would you like to use our Lens AI to help you get started?</h3>
          <Button>Yes, use LensAI</Button>
          <Button>No, I'll create Tasks myself</Button>
        </FormControl>
      </form>
    </>
  );
}

export default NewProjectForm;