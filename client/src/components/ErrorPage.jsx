import React from "react";
import WarningIcon from '@mui/icons-material/Warning';

const ErrorPage = (props) => {
  return (
    <h3><WarningIcon />  404 Error: Page not Found  <WarningIcon /> </h3>
  );
};
export default ErrorPage;