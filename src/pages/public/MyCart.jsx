import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { httpService, loggedInUser } from "../../httpService";
import CheckOutCard from "./CheckOutCard";
import { CartContext } from "../../context/CartContext";

export default function MyCart() {
  const [products, setProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const { setCart } = useContext(CartContext);

  const getCartPrice = async () => {
    const { data } = await httpService(`mestore/cartprice/${loggedInUser._id}`);

    if (data) {
      setCartPrice(data[0].CartAmount);
    }
  };

  const getCart = async () => {
    const res = await httpService(`mestore/detailedcart/${loggedInUser._id}`);

    if (res && res.data) {
      setCart(res.data.products);
      res.data.products.forEach((c) => {
        c.getCart = getCart;
        c.getCartPrice = getCartPrice;
      });
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    getCart();
    getCartPrice();
  }, []);
  return (
    <div className="mt-5">
      <div className="container">
        <Typography variant="h3" fontWeight={900} color="grey">
          My Cart
          <span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </Typography>
        <hr />

        <div className="mt-2">
          <div className="row">
            <div className="col-lg-6">
              {products.map((c) => (
                <CheckOutCard {...c} />
              ))}
            </div>
            <div className="col-lg-6 d-flex align-items-center bg-light p-5">
              <div>
                <Typography gutterBottom variant="body1" color="#303f9f">
                  Amount to pay
                </Typography>
                <Typography variant="h3" fontWeight={600} color="#1a237e">
                  ₦{cartPrice.toLocaleString()}.00
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
