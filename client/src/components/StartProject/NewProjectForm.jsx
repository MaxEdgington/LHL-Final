import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel, Box, Paper, Grid } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { projectContext } from "../../providers/ProjectProvider";
import { columnsContext } from "../../providers/ColumnsProvider";
import background from "../../../public/lens-img-darkmode.jpeg";
import { ClipLoader } from "react-spinners";

function NewProjectForm(props) {
  // const { setView } = props;
  const { projectAddFetchSet, addProject } = useContext(projectContext);
  const { addGeneratedTasks } = useContext(columnsContext);
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDueDate, setProjectDueDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLensAIClick = async () => {
    setIsLoading(true);
    try {
      await addGeneratedTasks(projectDescription, projectName, projectDueDate);
      navigate(`/projectBoard/${projectName}`);
      // setView(1);
    } catch (error) {
      console.error("Error adding generated tasks:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      project_name: projectName,
      project_description: projectDescription,
      project_due_date: projectDueDate,
    };

    console.log(formData);
    projectAddFetchSet(formData);
    navigate(`/projectBoard/${projectName}`);
    // setView(1);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
      }}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClipLoader color="#123abc" size={150} />
        </div>
      ) : (
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <h2>Start a New Project</h2>
            </Grid>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  label="Project Name"
                  name="project_name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  variant="outlined"
                ></TextField>
                <TextField
                  label="Project Description"
                  name="project_description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  variant="outlined"
                ></TextField>
                <DateField
                  label="Project Due Date"
                  name="project_due_date"
                  value={projectDueDate}
                  variant="outlined"
                  onChange={(date) => setProjectDueDate(date)}
                />
                <h3>
                  Would you like to use our Lens AI to help you get started?
                </h3>
                <Button
                  variant="contained"
                  onClick={handleLensAIClick}
                  disabled={isLoading}
                >
                  Yes, use LensAI
                </Button>
                <Button variant="contained" type="Submit">
                  No, I'll enter the tasks myself
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      )}
    </Box>
  );
}

export default NewProjectForm;

//  ternary condition based on isLoading. If isLoading is true, we display the loading spinner. Otherwise, we render the main content of the component.
