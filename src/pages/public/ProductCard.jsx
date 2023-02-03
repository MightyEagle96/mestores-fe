import React, { useContext, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { LoadingButton } from "@mui/lab";
import { CartContext } from "../../context/CartContext";
import { httpService } from "../../httpService";

export default function ProductCard(c) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

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
          console.log(res2.data);
        }
      }

      setLoading(false);
    }
  };
  return (
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
        <LoadingButton
          loadingPosition="end"
          onClick={addToCart}
          loading={loading}
          endIcon={<FontAwesomeIcon icon={faCartPlus} />}
        >
          <span> Add to cart</span>
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
