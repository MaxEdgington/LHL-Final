import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { columnsContext } from "../providers/ColumnsProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 450, // height from `main`
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskDetailModel = (props) => {
  const {
    name,
    id,
    description,
    project_id,  // If you don't use this prop, consider removing it
    due_date,
    assigned_user,
    handleClose,
  } = props;

  const { handleDelete, columns } = useContext(columnsContext);

  const deleteTask = () => {
    handleDelete(id);
    // console.log("++++New Columns data here:", columns)
    handleClose();
  };

  console.log("Props received by TaskDetailModel:", props);

  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align="center"
        fontSize={36}
      >
        {name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28}>
        {description}
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        fontSize={28}
        mb={2}
      >
        Due Date: {due_date}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={28} mb={2}> 
        Assigned User: {assigned_user}
      </Typography>
      <Stack direction="column" spacing={2} sx={{ '& button': { m: 1 } }}>
        <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteTask}>
          Delete
        </Button>
        <Button variant="outlined" size="small">
          Edit
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskDetailModel;