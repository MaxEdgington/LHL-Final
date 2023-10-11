import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, Stack, Box, Paper, Grid, Hidden, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";

import { projectContext } from "../../providers/ProjectProvider";
import { columnsContext } from "../../providers/ColumnsProvider";
import { userContext } from "../../providers/UserProvider";

import background from "../../../public/lens-img-darkmode.jpeg";
import { ClipLoader } from "react-spinners";
const spinningLens = "/spinning-lens.gif";

function NewProjectForm() {
  // Removed 'props' since it's not needed
  const { addProject, project } = useContext(projectContext);
  const { loggedinUser } = useContext(userContext);
  const navigate = useNavigate();
  const { addGeneratedTasks } = useContext(columnsContext);

  // states for the form
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDueDate, setProjectDueDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLensAIClick = async () => {
    setIsLoading(true);
    try {
      const formData = {
        project_name: projectName,
        project_description: projectDescription,
        project_due_date: projectDueDate,

        // owner_id: loggedinUser.id //owner currently hard coded
      };
      const newProjectData = await addProject(formData);
      console.log("Line 30 of NewProjectForm", newProjectData);
      await addGeneratedTasks(projectDescription, newProjectData.id);
      navigate(`/projectBoard/${newProjectData.id}`); // Redirect to main board after adding tasks
    } catch (error) {
      console.error("Error adding generated tasks:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    /// need a way to handle error if no one is logged in
    const formData = {
      project_name: projectName,
      project_description: projectDescription,
      project_due_date: projectDueDate,

      // owner_id: loggedinUser.id //owner currently hard coded
    };

    try {
      console.log("Before adding project");
      const newProjectData = await addProject(formData);
      console.log("Returned data after adding project:", newProjectData); // Debugging line
      navigate(`/projectBoard/${newProjectData.id}`);
    } catch (error) {
      console.error("Error while creating the project and navigating:", error);
    }
  };

  const paperStyle = {
    padding: 20,
    width: 280,
    margin: "20px auto",
    paddingTop: "40px",
    paddingBottom: "40px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(2px)",
        alignSelf: "center",
        height: "100%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <!-- set image to vertical, horizontal center, position: absolute, css animation rotate --> */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            width: "100vw",
            backgroundColor: "#000000A0",

            // TODO: come visit me @max
            // width: "100vw",
            // filter: "opacity(50%)",
          }}
        >
          <img
            src={spinningLens}
            style={{ filter: "invert(1)" }}
            alt="Loading..."
            width="150"
            height="150"
          />
        </div>

      ) : (

        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Typography sx={{
                fontWeight: 'bold',
                fontSize: "1.2rem",
                fontFamily: "monospace",
                letterSpacing: ".3px",

              }}>
                Start a New Project
              </Typography>
            </Grid>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  label="Project Name"
                  name="project_name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  style={{ marginBottom: "10px" }}
                  size="small"
                  variant="outlined"
                  margin="normal"
                ></TextField>

                <TextField
                  label="Project Description"
                  name="project_description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  size="small"
                  style={{ marginBottom: "10px" }}
                  variant="outlined"
                  multiline
                  maxRows={4}
                ></TextField>

                <DateField
                  label="Project Due Date"
                  name="project_due_date"
                  value={projectDueDate}
                  variant="outlined"
                  size="small"
                  onChange={(date) => setProjectDueDate(date)}
                />

                <Typography style={{
                  marginTop: "24px",
                  fontSize: ".9rem",
                  fontWeight: "600",
                  marginBottom: "15px"
                }}>
                  Would you like to use <br />
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src='../../../public/lens-line.png' alt='logo' height="25px" width="25px" />
                    Lens AI
                  </span>
                  to help you get started?
                </Typography>
                <Stack spacing={2} direction="column">
                  <Button
                    variant="contained"
                    onClick={handleLensAIClick}
                    disabled={isLoading}
                    margin="normal"
                  >
                    Yes, use Lens AI
                  </Button>

                  <Button variant="contained" margin="2" onClick={handleSubmit}>
                    No, I'll enter the tasks myself
                  </Button>
                </Stack>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      )
      }
    </Box >
  );
}

export default NewProjectForm;

//  ternary condition based on isLoading. If isLoading is true, we display the loading spinner. Otherwise, we render the main content of the component.
