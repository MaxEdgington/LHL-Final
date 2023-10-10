// import React, { useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Box,
//   Grid,
//   Paper,
//   Avatar,
//   Button,
//   Typography,
//   Link,
// } from "@mui/material";
// import { userContext } from "../../providers/UserProvider";
// import { projectContext } from "../../providers/ProjectProvider";

// const MyProjectListItem = (props) => {
//   const params = useParams();
//   const { id, name, desc, due_date, ownerID } = props;
//   const { loggedinUser } = useContext(userContext);
//   const { project, myProjects, addProject, selectProject } =
//     useContext(projectContext);
//   const navigate = useNavigate();

//   const handleClick = async () => {
//     await selectProject(id);
//     navigate(`/projectboard/${id}`);
//   };
//   return (
//     <Box>
//       <Paper>
//         <span onClick={() => handleClick(name)}>Link</span>
//         Project Name: {name}... Description: {desc}... Due Date: {due_date}...
//         ownerID: {ownerID}
//       </Paper>
//     </Box>
//   );
// };
// export default MyProjectListItem;