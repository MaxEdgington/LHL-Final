import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

// import MyProjectListItem from "./MyProjectListItem";
import ProjectTable from "./ProjectsTable"

import { userContext } from "../providers/UserProvider"
import { projectContext } from "../providers/ProjectProvider"
import background from "../../public/lens-img-darkmode.jpeg";

import { Box, Grid, Paper } from "@mui/material"

const AllProjectsList = () => {
  const { loggedinUser } = useContext(userContext)
  const { fetchAllProjects, allProjects } = useContext(projectContext)
  const params = useParams()

  useEffect(() => {
    fetchAllProjects()
  }, [params])

  console.log("is this the right params", params)
  console.log("do i have the user?", loggedinUser)
  allProjects.map((row) => console.log("this is a row", row))

  const paperStyle = { padding: 2, height: "70vh", margin: "20px auto", backgroundColor: "#FAFAFA" }
  const boxStyle = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    height: "100%",
  }

  return (
    <>
      <Grid container style={boxStyle}>
        <Paper elevation={10} style={paperStyle}>
          <Box>
            <h1>
              <img src="lens-line.png" alt="syntax" height="50px" />
              <div>All Lens Projects </div>
            </h1>
            {/* this need to be a cookie, not state */}
          </Box>

          <ProjectTable whichProjects={allProjects} />
        </Paper>
      </Grid>
    </>
  )
}
export default AllProjectsList
