import React, { useContext } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography, Link, FormControlLabel, TextField } from '@mui/material';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import background from '../../../public/lots-of-lenses.jpg';
import { userContext } from '../../providers/UserProvider';

const Login = () => {
  const { handleSignIn } = useContext(userContext);

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
            <Avatar src="../../../public/lens-line.jpg"></Avatar>
            <h2>Sign In</h2>
          </Grid>

          <form onSubmit={handleSignIn}>
            <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required />
            <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth />
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