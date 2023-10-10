import React, { useContext, useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Paper,
  Avatar,
  Button,
  Typography,
  Link,
  FormControlLabel,
  TextField,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import background from '../../../public/lighthouse-lens.jpeg';
// import MyProjectListItem from "./MyProjectListItem";
import ProjectTable from "../ProjectsTable";
import { useTheme } from "@mui/material/styles";

import { userContext } from "../../providers/UserProvider";
import { projectContext } from "../../providers/ProjectProvider";

const MyProjectsList = () => {
  const { loggedinUser, selectUser, findUserInfo } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchMyProjects } =
    useContext(projectContext);
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  console.log("is this the right params", params);


  console.log("don't got them", myProjects);
  console.log("do i have the user?", loggedinUser);
  myProjects.map((row) => console.log("this is a row", row));

  const paperStyle = { padding: 2, height: '70vh', width: '75%', margin: "20px auto", backgroundColor: '#FAFAFA' };
  const boxStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  };

  return (
    <>
      <Grid container style={boxStyle}>
        <Paper elevation={10} style={paperStyle}>
          <Box>

            <h1>
              <img src={loggedinUser.avatar} alt="syntax" height="50px" />
              {loggedinUser.username}'s Projects
            </h1>
            {/* this need to be a cookie, not state */}
          </Box>

          <ProjectTable />
        </Paper>

      </Grid>
    </>
  );
};
export default MyProjectsList;
