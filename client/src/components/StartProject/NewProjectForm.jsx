import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Box, Paper, Grid } from '@mui/material';
import { DateField } from "@mui/x-date-pickers";
import { projectContext } from "../../providers/ProjectProvider";
import background from '../../../public/lens-img-darkmode.jpeg';


function NewProjectForm(props) {
  const { SetView } = props;
  const { addProject } = useContext(projectContext);

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDueDate, setProjectDueDate] = useState(null);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //     [description]: value,
  //     [due_date]: value
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      project_name: projectName,
      project_description: projectDescription,
      project_due_date: projectDueDate,
      //     // loggedin user will need to go here from session
    };

    console.log(formData);
    addProject(formData);
    setView(1);
  };
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };

  return (
    <Box
      style={{
        backgroundImage: `url(${background})`,
        height: '100vh'
      }}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h2>Start a New Project</h2>
          </Grid>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>
              {/* <FormLabel></FormLabel> */}
              <TextField
                label="Project Name"
                name="project_name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}

                variant="outlined"
              >
              </TextField>
              <TextField
                label="Project Description"
                name="project_description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                variant="outlined"
              >
              </TextField>
              <DateField
                label="Project Due Date"
                name="project_due_date"
                value={projectDueDate}
                variant="outlined"
                onChange={(date) => setProjectDueDate(date)}
              />


              <h3>Would you like to use our Lens AI to help you get started?</h3>
              <Button variant="contained">Yes, use LensAI</Button> {/* this button will need to open a different Form*/}
              <Button variant="contained" type="Submit"> No, I'll enter the tasks myself</Button>
            </FormControl>
          </form >
        </Paper>
      </Grid>
    </Box>
  );
};

export default NewProjectForm;