import { useContext, useState } from "react";
import { Box, Grid, Paper, Avatar, Button, Typography, Link, TextField } from "@mui/material";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import background from "../../../public/lots-of-lenses.jpg";
import { userContext } from "../../providers/UserProvider";

const Login = () => {
  const { setCookie } = useContext(userContext);
  const [formEmail, setFormEmail] = useState();
  const [formPassword, setFormPassword] = useState();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = {
      email: formEmail,
    };
    console.log("move handle funct", formData);
    await setCookie(formData);
    e.target.reset();
  };

  /*
    style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backdropFilter: "blur(2px)",
        display: "flex",
        flexShrink: 1,
        alignSelf: "center",
      }}
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
  */

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
  const btnstyle = { margin: "8px 0" };


  return (
    <Box
      style={{
        // backgroundImage: `url(${background})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center center",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
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
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" style={{ marginBottom: "50px" }}>
            <Avatar src="lens-line.png" style={{ marginBottom: "24px" }}></Avatar>
            <span style={{
              fontWeight: 'bold',
              fontSize: "1.2rem",
              fontFamily: "monospace",
              letterSpacing: ".3px",
            }}>
              Sign In
            </span>
          </Grid>

          <form onSubmit={handleSignIn}>
            <TextField
              label="Email"
              size="small"
              name="email"
              placeholder="Enter email"
              onChange={(e) => setFormEmail(e.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: "10px" }}
              required
            />
            <TextField
              label="Password"
              size="small"
              style={{ marginBottom: "10px" }}
              onChange={(e) => setFormPassword(e.target.value)}
              name="password"
              placeholder="Enter password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              disabled={!formEmail || !formPassword}
            >
              Sign in
            </Button>

            <Typography style={{
              marginTop: "24px",
              fontSize: ".9rem"
            }}>
              Don&apos;t have an account?
              <Link style={{ marginLeft: "4px", fontWeight: 700 }} href="#">
                Sign Up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
