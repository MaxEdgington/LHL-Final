import React, { useState } from "react";
import {Box, Typography} from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskEditModel = (props) => {
  const {name, id, description, project_id, due_date, assigned_user, handleClose} = props

  return (
    <Box sx={style}>  
      <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontSize={36}>
        Task Name: {name}
      </Typography>

      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28}> 
        Description: {description}
      </Typography>

      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28} mb={2}> 
        Due Date: {due_date}
      </Typography>

      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28} mb={2}> 
        Assigned User: {assigned_user}
      </Typography>

      <Stack direction="column" spacing={2} sx={{ '& button': { m: 1 } }}>
        
        {/* link back to the 'home' route whose component is TaskDetailModel */}
        <Link to="/"><Button variant="outlined" size="small" >
            Save
        </Button></Link>

      </Stack>
  </Box>
  )
}

export default TaskEditModel;