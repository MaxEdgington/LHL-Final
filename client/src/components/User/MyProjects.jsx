import React, { useContext, useState } from 'react';
import { Box, Grid, Paper, Avatar, Button, Typography, Link, FormControlLabel, TextField } from '@mui/material';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Checkbox from '@mui/material/Checkbox';
// import background from '../../../public/XXXXX';
import { userContext } from '../../providers/UserProvider';

const MyProjects = () => {
  const { loggedinUser } = useContext(userContext);
  return (
    <h1>something</h1>
  );

};

export default MyProjects;