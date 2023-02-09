import React from "react";
import { Spinner } from "react-bootstrap";

export default function MySpinner() {
  return (
    <div className="d-flex justify-content-center mt-2 mb-2">
      <Spinner animation="border" className="text-center" variant="secondary" />
    </div>
  );
}
