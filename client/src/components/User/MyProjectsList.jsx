import React, { useContext, useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Paper, Avatar, Button, Typography, Link, FormControlLabel, TextField } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// import background from '../../../public/do i want a background picture?'; 
import MyProjectListItem from './MyProjectListItem';
import { useTheme } from '@mui/material/styles';

import { userContext } from '../../providers/UserProvider';
import { projectContext } from '../../providers/ProjectProvider';

const MyProjectsList = () => {
  const { loggedinUser, selectUser } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchMyProjects } = useContext(projectContext);
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  console.log("is this the right params", params);

  useEffect(() => {
    selectUser(params.id);
    fetchMyProjects(params.id);
  }, [params]);
  // }, [loggedinUser]);


  console.log("don't got them", myProjects);
  console.log("do i have the user?", loggedinUser);
  myProjects.map((row) => (console.log("this is a row", row)));

  const handleProjectClick = async (name) => {
    await selectProject(name);
    navigate(`/projectboard/${id}`);
  };

  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Box>
          <img src={loggedinUser.avatar} alt="syntax" height="50px" />
          <h1>{loggedinUser.username}'s Projects</h1>
          {/* this need to be a cookie, not state */}

        </Box>
        <Box sx={{ justifyContent: 'center' }}>
          <TableContainer component={Paper} sx={{ width: `90%` }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#a3a2a9' }}>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due&nbsp;Date</TableCell>
                  <TableCell align="right">Owner</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myProjects.map((row) => (

                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th" scope="row"
                      sx={{ color: 'darkred' }}
                      onClick={() => navigate(`/projectboard/${row.id}`)}
                    >
                      <KeyboardDoubleArrowRightIcon />
                      {/* <Link to={`/projectboard/${row.id}`}>{row.name}</Link> */}
                      {/* onClick={() => handleProjectClick(row.id)} */}
                    </TableCell>

                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.due_date}</TableCell>
                    {/* how can we format this date better? */}
                    <TableCell align="right">{row.owner_id}</TableCell>
                    <TableCell align="right">avatar</TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </>
  );
};
export default MyProjectsList;