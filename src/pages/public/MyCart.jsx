import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { httpService, loggedInUser } from "../../httpService";
import CheckOutCard from "./CheckOutCard";

export default function MyCart() {
  const [products, setProducts] = useState([]);
  const getCart = async () => {
    const res = await httpService(`mestore/detailedcart/${loggedInUser._id}`);

    if (res && res.data) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    getCart();
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
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
