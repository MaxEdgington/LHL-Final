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
  const { addMessage, fetchMessagesforProject } = useContext(messageContext);

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
    fetchMessagesforProject(parseInt(project_id.id));
    setMessage("");
  };


  return (
    <Card>
      <CardContent>


        <form noValidate justifyContent='space-between' autoComplete="off" onSubmit={handleSubmit}>
          <FormControl>
            <Box container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* why isnt this not spaced??? */}

              <TextField
                id="outlined-basic-email"
                name="sendMessage"
                label="Send A Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ width: '100%', marginRight:'15px' }} />

              <Fab type="Submit" size="small" color="primary" aria-label="add"> <SendIcon /> </Fab>
            </Box>

          </FormControl>
        </form >


      </CardContent>
    </Card>

  );
};

export default NewMsgForm;