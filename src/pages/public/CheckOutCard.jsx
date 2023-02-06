import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Chip, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, forwardRef } from "react";
import { httpService, loggedInUser } from "../../httpService";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

export default function CheckOutCard(c) {
  const [open, setOpen] = useState(false);
  const [snackBar, setSetSnackBar] = useState({});
  const increaseItem = async () => {
    const res = await httpService.patch(
      `mestore/increasequantity/${loggedInUser._id}`,
      { quantity: c.quantity, product: c.product._id }
    );

    if (res) {
      setOpen(!open);
      setSetSnackBar({ severity: "info", message: "Increased item" });
      c.getCart();
      c.getCartPrice();
      // setSetSnackBar(null);
    }
  };
  const decreaseItem = async () => {
    const res = await httpService.patch(
      `mestore/decreasequantity/${loggedInUser._id}`,
      { quantity: c.quantity, product: c.product._id }
    );

    if (res) {
      setOpen(!open);
      setSetSnackBar({ severity: "info", message: "Decreased item" });
      c.getCart();
      c.getCartPrice();
    }
  };

  const removeItem = async () => {
    const res = await httpService.patch(
      `/mestore/removeitem/${loggedInUser._id}`,
      { product: c._id }
    );

    if (res) {
      setOpen(!open);
      setSetSnackBar({ severity: "error", message: "Item removed from cart" });
      c.getCart();
      c.getCartPrice();
    }
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="mb-3">
      <Stack direction="row" spacing={3} className="d-flex align-items-center">
        <div>
          <Avatar src={c.product.image} sx={{ height: 100, width: 100 }} />
        </div>
        <div>
          <Typography fontWeight={500}>{c.product.name}</Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            ₦{c.product.price.toLocaleString()}
          </Typography>
        </div>
        <div>
          <div>
            <Stack
              direction={"row"}
              spacing={1}
              className="d-flex align-items-center"
            >
              <IconButton color="warning" size="small" onClick={increaseItem}>
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>

              <Typography fontWeight={700}>{c.quantity}</Typography>

              <IconButton
                size="small"
                color="warning"
                disabled={c.quantity === 1}
                onClick={decreaseItem}
              >
                <FontAwesomeIcon icon={faMinus} />
              </IconButton>
            </Stack>
          </div>
        </div>
        <div>
          <Chip color="warning" label={`₦${c.unitPrice.toLocaleString()}`} />
        </div>
        <div>
          <LoadingButton
            endIcon={<FontAwesomeIcon icon={faTrash} />}
            onClick={removeItem}
          >
            <span>remove item</span>
          </LoadingButton>
        </div>
      </Stack>
      <hr />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
