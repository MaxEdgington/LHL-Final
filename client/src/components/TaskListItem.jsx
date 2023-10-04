import React, { useState } from "react";
import "../styles/TaskListItem.scss";

import { Box, Card, CardContent, CardActions, Typography, Avatar, CardActionArea, useTheme } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";
import Modal from '@mui/material/Modal';
import TaskDetailModel from "./TaskDetailModel";

const TaskListItem = (props) => {
  const { id, name, index } = props;
  const { description, project_id, due_date, assigned_user } = props.task;
  const theme = useTheme();

  const [ModalOpen, setModalOpen] = useState(false);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'primary' : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Draggable key={id} draggableId={String(id)} index={index}>
      {(provided, snapshot) => (

        <Box sx={{ marginBottom: 1 }}>
          <Card>
            <CardActionArea>
              <Modal open={ModalOpen} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div>
                  <TaskDetailModel name={name} id={id} description={description} project_id={project_id} due_date={due_date} assigned_user={assigned_user} />
                </div>
              </Modal>

              <CardContent onClick={handleOpen}>
                <Typography variant="h5" component="div">
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>

                    {name}

                  </div>
                </Typography>
              </CardContent>

            </CardActionArea>

          </Card>
        </Box>
      )}
    </Draggable>
  );

};

export default TaskListItem;

