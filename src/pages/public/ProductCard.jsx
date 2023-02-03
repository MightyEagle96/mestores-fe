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

export default function ProductCard(c) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const addToCart = (newItem) => {
    setCart(() => [...cart, newItem]);
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
          onClick={() => setLoading(!loading)}
          loading={loading}
          endIcon={<FontAwesomeIcon icon={faCartPlus} />}
        >
          <span> Add to cart</span>
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
