import React, { forwardRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";
export default function MySnackBar({ open, severity, message }) {
  const [close, setClose] = useState(open);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    open = false;
    // setClose(!close);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
