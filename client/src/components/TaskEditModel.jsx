import React, { useState, useContext } from "react";
import { columnsContext } from "../providers/ColumnsProvider";
import {Box, Typography, TextField, FormControl, FormGroup, InputLabel, Input} from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';

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

  const { saveEditedTask } = useContext(columnsContext)

  const projectId = useParams().id

  const initialTask = [
    name,
    description,
    due_date,
    assigned_user
  ]

  const [task, setTask] = useState(initialTask)
  // console.log("task here:", task)
  // console.log("type of due_date:", typeof task[2])
  
  const handleSave = () => {
    // make axois post request here to update the tasks table(also need to change the id of assigned_user)
    saveEditedTask(id, task)
    handleClose();
  }
 
  return (
  <Box sx={style}>

    <Typography id="modal-modal-title" variant="h6" component="h2" align="center" fontSize={36}>
        {task[0]} 
    </Typography>

    <FormGroup >

      {/* name */}
      <TextField 
        id="outlined-controlled"
        label="Edit Name" 
        value={task[0]} 
        sx={{ mt: 2 }} 
        fontSize={28} 
        // event.target.value is the value in the TextField
        onChange={(event) => setTask(prevTask => [event.target.value, ...prevTask.slice(1)])}
      />
      
      {/* description */}
      <TextField 
        id="outlined-controlled" 
        label="Edit Description"
        value={task[1]} 
        sx={{ mt: 2 }} 
        fontSize={28} mb={2} 
        onChange={(event) => setTask(prevTask => [prevTask[0], event.target.value, ...prevTask.slice(2)])}
      />

      {/* due_date */}
      <TextField 
        id="outlined-controlled" 
        label="yyyy-mm-dd"
        value={task[2]} 
        sx={{ mt: 2 }} 
        fontSize={28} 
        mb={2} 
        onChange={(event) => setTask(prevTask => [...prevTask.slice(0, 2), event.target.value, prevTask[3]])}
      />
      
      {/* assigned_user */}
      <TextField 
        id="outlined-controlled"
        label="Edit Assigned User" 
        value={task[3]} 
        sx={{ mt: 2 }} 
        fontSize={28} 
        onChange={(event) => setTask(prevTask => [...prevTask.slice(0, 3), event.target.value])}
      />

      <Stack direction="column" spacing={2} sx={{ '& button': { m: 1 } }}>
        
        {/* link back to the 'home' route whose component is TaskDetailModel */}
        {/* need to change to ${projectId} */}
        <Link to={`/projectboard/${projectId}`}>
          <Button variant="outlined" size="small" onClick={handleSave}>
            Save
          </Button>
        </Link>
        {/* <Button 
          variant="outlined" 
          size="small" 
          onClick={()=> navigate("/projectboard/:name")}
        >
          Save
        </Button> */}

      </Stack>
      </FormGroup>
  </Box>
  )
}

export default TaskEditModel;