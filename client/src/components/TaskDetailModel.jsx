import React from "react";
import {Box, Typography} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskDetailModel = (props) => {
  const {name, id, description, project_id, due_date, assigned_user} = props

  return (
    <Box sx={style}>  
      <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontSize={36}>
        {name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28}> 
        {description}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28}> 
        Due Date: {due_date}
        {/* it does not show the correct due_date!!! */}
      </Typography>
  </Box>
  )
}

export default TaskDetailModel;