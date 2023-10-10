import React, { useState } from "react";
// import "../styles/TaskListItem.scss";

import { Box, Card, CardContent, CardActions, Typography, Avatar, CardActionArea, useTheme } from "@mui/material";

import { Draggable } from "react-beautiful-dnd";
import Modal from '@mui/material/Modal';
import TaskDetailModel from "./TaskDetailModel";
import TaskEditModel from "./TaskEditModel";
import axios from "axios";

import { Route, Routes, Link } from 'react-router-dom';

const TaskListItem = (props) => {
  const { id, name, index } = props;
  const { description, project_id, due_date, assigned_user } = props.task;
  const theme = useTheme();

  const [ModalOpen, setModalOpen] = useState(false);
  const [Assigned_user_name, setAssigned_user_name] = useState("");

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#a3a2a9" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handleOpen = async () => {
    try {
      const userResult = await axios.get(`/api/tasks/${id}/assigned_user`);

      console.log("Get assigned user name:", userResult);

      const user_name = userResult.data;
      setAssigned_user_name(user_name);
      setModalOpen(true);

    } catch (error) {
      console.error("Could not show TaskDetailModel", error);
      console.log("Get assigned_user_id:", assigned_user);
    }
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
                  {/* define the react-router routes here */}
                  <Routes>

                    {/* path="/projectboard/:name/model" */}
                    <Route path="modal" element=
                      {<div>
                        <TaskDetailModel name={name} id={id} description={description} project_id={project_id} due_date={due_date} assigned_user={Assigned_user_name} handleClose={handleClose} />
                      </div>
                      } />

                    {/* <Routes>   */}
                    {/* define the /edit route as TaskEditModel */}
                    <Route path="modal/edit" element=
                      {<div>
                        <TaskEditModel name={name} id={id} description={description} project_id={project_id} due_date={due_date} assigned_user={Assigned_user_name} handleClose={handleClose} />
                      </div>
                      } />

                  </Routes>
                </div>
              </Modal>

              <Link to="modal">
                <CardContent onClick={handleOpen}>
                  <Typography variant="h5" component="div" >
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>

                      {name}

                    </div>
                  </Typography>
                </CardContent>
              </Link>

            </CardActionArea>
          </Card>
        </Box>
      )}
    </Draggable>
  );

};

export default TaskListItem;

