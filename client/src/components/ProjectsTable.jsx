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

// import background from '../../../public/do i want a background picture?';
// import MyProjectListItem from "./User/MyProjectListItem";
import { useTheme } from "@mui/material/styles";

import { userContext } from "../providers/UserProvider";
import { projectContext } from "../providers/ProjectProvider";

const ProjectTable = (props) => {
  const { whichProjects } = props;
  const { project, myProjects, addProject, selectProject, fetchMyProjects } =
    useContext(projectContext);
  const { loggedinUser, selectUser, findUserInfo } = useContext(userContext);

  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // useEffect(() => {
  //   selectUser(params.id);
  //   fetchMyProjects(params.id);
  // }, [params]);

  whichProjects.map((row) => console.log("this is a row", row));

  const handleProjectClick = async (name) => {
    await selectProject(name);
    navigate(`/projectboard/${id}`);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "90%",
      }}
    >
      <TableContainer component={Paper} maxheight="100%">
        <Table
          stickyHeader
          aria-label="simple table"
          style={{ height: "100%" }}
          size="small"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#660000" }}>
              <TableCell
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#660000",
                }}
              ></TableCell>
              <TableCell
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#660000",
                }}
                align="left"
              >
                Project Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#660000",
                }}
                align="left"
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#660000",
                }}
                align="left"
              >
                Due&nbsp;Date
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: "#660000",
                }}
                align="left"
              >
                Owner
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: "scroll", height: "100%" }}>
            {whichProjects.map((row) => (
              <TableRow key={row.project_name}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ color: "darkred" }}
                  onClick={() => navigate(`/projectboard/${row.project_id}`)}
                >
                  <KeyboardDoubleArrowRightIcon />
                </TableCell>

                <TableCell align="left" style={{ fontWeight: 600 }}>
                  {row.project_name}
                </TableCell>
                <TableCell align="left" style={{ fontStyle: "italic" }}>
                  {row.project_description}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.project_due_date).toLocaleString({
                    dateStyle: "short",
                    timeStyle: "medium",
                    weekDay: "short",
                  })}
                </TableCell>
                {/* how can we format this date better? */}
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      alt="LHL"
                      src={row.owner_avatar}
                      sx={{ width: 30, height: 30, marginRight: "8px" }}
                    />
                    <span style={{ marginRight: "4px" }}>
                      {row.owner_username}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProjectTable;
