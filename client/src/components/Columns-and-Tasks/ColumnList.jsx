import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import ColumnListItem from "./ColumnListItem";
import ChatDrawer from "../Chat/ChatDrawer";
import { Box, Typography, Paper, Fab, Tooltip } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

import "../../styles/ColumnList.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { columnsContext } from "../../providers/ColumnsProvider";
import { projectContext } from "../../providers/ProjectProvider";
// import background from '../../public/lens-img-darkmode.jpeg';

const ColumnList = (props) => {
  const { columns, fetchTasks, onDragEnd } = useContext(columnsContext);
  const { project, selectProject } = useContext(projectContext);
  // console.log("am i getting the project?", project);
  const params = useParams();

  const handleEmailClick = () => {
    const mailtoLink = `mailto:${project.owner_id}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    selectProject(params.id);
    fetchTasks(params.id);
  }, [params]);



  console.log(columns);
  const columnArr = Object.entries(columns).map(([columnId, column]) => {
    return (
      <ColumnListItem
        key={columnId}
        id={columnId}
        url_param={params.id}
      // name={column.name}
      // tasks={column.tasks}
      />
    );
  });

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Box
        sx={{
          flex: 1,
          paddingTop: "8px",
          paddingBottom: "16px",
          bgcolor: "#eaeaee",
          // backgroundImage: `url(${background})`
          // change to theme colours
        }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '3em' }}>

          <Tooltip title="Email Lead">
            <Fab color="primary" aria-label="email" onClick={handleEmailClick}>
              <EmailIcon />
            </Fab>
          </Tooltip>

          <div>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
          </div>

          <ChatDrawer url_param={params} />

        </Box>

        <ul className="columnlist">{columnArr}</ul>

      </Box>
    </DragDropContext>
  );
};

export default ColumnList;
