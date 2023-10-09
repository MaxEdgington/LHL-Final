import React, { useContext, useState } from "react";
import { Card, CardContent, FormControl, TextField, Fab, Box, Paper, Grid } from '@mui/material';
import { projectContext } from "../../providers/ProjectProvider";
import { userContext } from "../../providers/UserProvider";
import { messageContext } from "../../providers/MessageProvider";

import SendIcon from '@mui/icons-material/Send';

function NewMsgForm(props) {
  const { project_id } = props;
  const { addProject, project } = useContext(projectContext);
  const { loggedinUser } = useContext(userContext);
  const { addMessage } = useContext(messageContext);

  //these states are just to handle the data for the form
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const formattedTimestamp = currentTime.toISOString();

    /// need a way to handle error if no one is logged in
    const formData = {
      message: message,
      timestamp: formattedTimestamp,
      user_id: 1, //user currently hard coded
      project_id: parseInt(project_id.id)
    };

    console.log("am i getting form data", formData);
    await addMessage(formData);
  };


  return (
    <Card>
      <CardContent>
        <Grid container style={{ padding: '1px' }}>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>

              <TextField
                id="outlined-basic-email"
                name="sendMessage"
                label="Send A Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth />


              <Fab type="Submit" size="small" color="primary" aria-label="add"><SendIcon /></Fab>


            </FormControl>
          </form >

        </Grid>
      </CardContent>
    </Card>







  );
};

export default NewMsgForm;


  // <Grid>
  //   <Paper elevation={10} style={paperStyle}>
  //     <Grid align='center'>
  //       <h2>Start a New Project</h2>
  //     </Grid>

  //     <form noValidate autoComplete="off" onSubmit={handleSubmit}>
  //       <FormControl>
  //         <FormLabel></FormLabel>
  //         <TextField
  //           label="Project Name"
  //           name="project_name"
  //           value={projectName}
  //           onChange={(e) => setProjectName(e.target.value)}

  //           variant="outlined"
  //         >
  //         </TextField>
  //         <TextField
  //           label="Project Description"
  //           name="project_description"
  //           value={projectDescription}
  //           onChange={(e) => setProjectDescription(e.target.value)}
  //           variant="outlined"
  //         >
  //         </TextField>
  //         <DateField
  //           label="Project Due Date"
  //           name="project_due_date"
  //           value={projectDueDate}
  //           variant="outlined"
  //           onChange={(date) => setProjectDueDate(date)}
  //         />


  //         <h3>Would you like to use our Lens AI to help you get started?</h3>
  //         <Button variant="contained">Yes, use LensAI</Button>
  //         this button will need to open a different Form
  //         <Button variant="contained" type="Submit"> No, I'll enter the tasks myself</Button>
  //       </FormControl>
  //     </form >
  //   </Paper>
  // </Grid>
