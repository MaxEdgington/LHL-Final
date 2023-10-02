import React from "react";

const TaskDetailModel = (props) => {
  const {name, id, description, project_id, due_date, assigned_user} = props

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {description}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {due_date}
      </Typography>
  </Box>
  )
}

export default TaskDetailModel;