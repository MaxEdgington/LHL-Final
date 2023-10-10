import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// import MyProjectListItem from "./MyProjectListItem";
import ProjectTable from "./ProjectsTable";

import { userContext } from "../providers/UserProvider";
import { projectContext } from "../providers/ProjectProvider";
import background from '../../public/cameras-p.jpeg';

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


const AllProjectsList = () => {
  const { loggedinUser, selectUser, findUserInfo } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchAllProjects, allProjects } = useContext(projectContext);
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchAllProjects();
  }, [params]);


  console.log("is this the right params", params);
  console.log("do i have the user?", loggedinUser);
  allProjects.map((row) => console.log("this is a row", row));


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

            <h1 sx={{ justifyContent: 'center' }}>
              <img src="../../public/lens-line.png" alt="syntax" height="50px" />
              <div>All Lens Projects </div>
            </h1>
            {/* this need to be a cookie, not state */}
          </Box>

          <ProjectTable whichProjects={allProjects} />
        </Paper>

      </Grid>
    </>
  );
};
export default AllProjectsList;
