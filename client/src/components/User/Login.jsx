import React, { useContext, useState } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography, Link, FormControlLabel, TextField } from '@mui/material';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import background from '../../../public/lots-of-lenses.jpg';
import { userContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { loggedinUser, setCookie } = useContext(userContext);
  const [formEmail, setFormEmail] = useState();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = {
      email: formEmail
    };
    console.log("move handle funct", formData);
    await setCookie(formData);
    navigate('/myProjects');
    e.target.reset();
  };

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
  const btnstyle = { margin: '8px 0' };
  return (
    <Box
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%"
      }}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar src="../../../public/lens-line.png"></Avatar>
            <h2>Sign In</h2>
            <h4>{loggedinUser.email}</h4>
            {/* this h4 wont show because as soon as you're logged in it will redirect */}
          </Grid>

          <form onSubmit={handleSignIn}>
            <TextField
              label='Email'
              name='email'
              placeholder='Enter email'
              onChange={(e) => setFormEmail(e.target.value)}
              variant="outlined"
              fullWidth
              required />
            <TextField label='Password' name='password' placeholder='Enter password' type='password' variant="outlined" fullWidth />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
            {/* <Typography >
          <Link href="#" >
            Forgot password ?
          </Link>
        </Typography> */}
            <Typography > Do you have an account ?
              <Link href="#" >
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