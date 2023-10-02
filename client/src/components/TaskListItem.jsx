import React from "react";
import { Box, Card, CardContent, CardActions, Typography, Avatar } from "@mui/material";
import "../styles/TaskListItem.scss";
import { DragDropContext, Draggable } from "react-beautiful-dnd";



const TaskListItem = (props) => {
  const { name, id, index } = props;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "grey",
    padding: grid,
    width: 250
  });

  return (
    <Draggable key={id} draggableId={String(id)} index={index}>

      {(provided, snapshot) => (

        <Box sx={{ marginBottom: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">

                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                >
                  <Avatar alt="avatar" src="../../public/images/avatars/avatar1.png" />
                  {name}
                </div>

              </Typography>
            </CardContent>
            <CardActions>
              {/* somethign in here for clickable??? from mui? */}
            </CardActions>
          </Card>
        </Box>
      )}
    </Draggable>
  );

};



export default TaskListItem;

