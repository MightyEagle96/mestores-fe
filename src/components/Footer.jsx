import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div className="footer d-flex align-items-center">
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-4 mb-2 d-flex justify-content-center">
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
          <div className="col-lg-4  mb-2 d-flex justify-content-center">
            <Stack spacing={3}>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Privacy
              </Link>
              <Link href="#" underline="none" sx={{ color: "white" }}>
                Help
              </Link>
            </Stack>
          </div>
          <div className="col-lg-4 p-4   bg-white rounded d-flex align-items-center  ">
            <div className="w-100">
              <Typography fontWeight={700} color="#0d47a1" gutterBottom>
                Subscribe to news letter
              </Typography>
              <TextField fullWidth label="Email" />
              <Button>subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
