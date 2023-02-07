import { Link, Stack, TextField } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div className="footer d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center">
            <Stack spacing={3}>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Home
              </Link>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                About
              </Link>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Contact
              </Link>
            </Stack>
          </div>
          <div className="col-lg-4 d-flex justify-content-center">
            <Stack spacing={3}>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Privacy
              </Link>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Help
              </Link>
            </Stack>
          </div>
          <div className="col-lg-4 ">{/* <TextField fullWidth  /> */}</div>
        </div>
      </div>
    </div>
  );
}
