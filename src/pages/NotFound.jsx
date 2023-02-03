import React from "react";
import { Typography } from "@mui/material";

export default function NotFound() {
  return (
    <div>
      <div className="mb-5" style={{ marginTop: 100 }}>
        <div className="container">
          <Typography variant="h2" fontWeight={600} gutterBottom>
            404 Page not found
          </Typography>

          <div className="col-lg-4">
            <Typography variant="body1" color={"GrayText"}>
              The page you are looking for does not exist on our server or you
              do not have permission to view that page.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
