import React, { useContext, useState, forwardRef } from "react";
import { Card, CardMedia, CardContent, Typography, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";
import { CartContext, UserContext } from "../../context/CartContext";
import { httpService } from "../../httpService";
import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";
import { Badge } from "react-bootstrap";

export default function ProductCard(c) {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);

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
        setUser(res.data);
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
          setCart(res2.data.products);
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

  const hasbeenAdded = (id) => {
    const exist = cart.find((c) => c.product === id);

    return exist ? true : false;
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
        <div className="p-3">
          <Stack direction={"row"} className="d-flex align-items-center">
            <Typography fontWeight={600} fontSize={23}>
              ₦{c.price.toLocaleString()}
            </Typography>
            {hasbeenAdded(c._id) ? (
              <span className="p-3">
                {" "}
                <Badge bg="warning">Added to cart</Badge>
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
          </Stack>
        </div>
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
