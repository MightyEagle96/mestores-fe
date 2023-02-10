import { Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import GoogleLogin from "../../components/GoogleLogin";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="mt-5 container">
      <div className="col-lg-5">
        <Typography variant="h4" color="#0d47a1" fontWeight={700}>
          Welcome back, please Login
        </Typography>

        <div className="mt-3">
          <TextField fullWidth label="Email Address" />
        </div>
        <div className="mt-3">
          <TextField fullWidth label="Password" type="password" />
        </div>
        <div className="mt-3">
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            endIcon={<Login />}
          >
            <span>login</span>
          </LoadingButton>
        </div>

        <div className="mt-3 mb-2 text-center">
          <Typography>or</Typography>
        </div>
        <div>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
