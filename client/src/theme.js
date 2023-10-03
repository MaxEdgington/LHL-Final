import { createTheme } from '@mui/material';

// theme styles here
export const theme = createTheme({
  palette: {
    primary: {
      light: '#00FF00',
      main: '#FF0000',
      dark: '#0000FF',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFFF00',
      main: '#df0405',
      dark: '#9c0203',
      contrastText: '#000',
    },
  },
});