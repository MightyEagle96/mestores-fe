import React, { useContext, useState, forwardRef } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";
import { CartContext } from "../../context/CartContext";
import { httpService } from "../../httpService";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

export default function ProductCard(c) {
  const { cart, setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const addToCart = async (newItem) => {
    //setCart(() => [...cart, newItem]);

    const loggedInUser = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_PROJECT_USER)
    );

    if (!loggedInUser) {
      setLoading(true);
      const res = await httpService("mestore/createguest");

      if (res && res.data) {
        localStorage.setItem(
          process.env.REACT_APP_PROJECT_USER,
          JSON.stringify(res.data)
        );

        const res2 = await httpService.post("mestore/newcart", {
          account: res.data._id,
          product: c._id,
        });

        if (res2) {
          setLoading(false);
          setCart(res.data.products);
          handleClick();
        }
      }

      setLoading(false);
    } else {
      setLoading(true);
      const res = await httpService.patch(
        `mestore/addtocart/${loggedInUser._id}`,
        { product: c._id }
      );
      if (res && res.data) {
        handleClick();
        setCart(res.data.products);
      }
      setLoading(false);
    }
  };
  return (
    <>
      <Card>
        <CardMedia component="img" height="200" image={c.image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight={600}
            color="GrayText"
          >
            {c.name}
          </Typography>
          <Typography variant="subtitle2">{c.description}</Typography>
        </CardContent>
        <CardActions>
          <Typography fontWeight={600} fontSize={23}>
            ₦{c.price.toLocaleString()}
          </Typography>
          {cart.includes(c._id) ? (
            <span className="p-3">
              <Typography variant="">Added to cart</Typography>
            </span>
          ) : (
            <span className="p-2">
              <LoadingButton
                loadingPosition="end"
                onClick={addToCart}
                loading={loading}
                endIcon={<FontAwesomeIcon icon={faCartPlus} />}
              >
                <span> Add to cart</span>
              </LoadingButton>
            </span>
          )}
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product added to your cart
        </Alert>
      </Snackbar>
    </>
  );
}
