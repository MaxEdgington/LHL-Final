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
              <Grid container flexDirection={"row"}>


                <TextField
                  id="outlined-basic-email"
                  name="sendMessage"
                  label="Send A Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth />

                <Fab type="Submit" size="small" color="primary" aria-label="add"> <SendIcon /> </Fab>
              </Grid>

            </FormControl>
          </form >

        </Grid>
      </CardContent>
    </Card>

  );
};

export default NewMsgForm;