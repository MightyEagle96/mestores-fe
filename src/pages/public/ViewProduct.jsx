import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/productLists";
import { httpService } from "../../httpService";
import { LoadingButton } from "@mui/lab";

import { CartContext } from "../../context/CartContext";
import ProductCard from "./ProductCard";

export default function ViewProduct() {
  const { cart, setCart } = useContext(CartContext);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [productsList, setProductsList] = useState([]);

  const getData = () => {
    setProduct(products.find((c) => c.slug === slug));
  };

  const getDataFromServer = async () => {
    const res = await httpService.get(`mestore/viewProducts?category=${slug}`);

    if (res) {
      setProductsList(res.data);
    }
  };

  useEffect(() => {
    getData();
    getDataFromServer();
  }, []);

  return (
    <div>
      <div className="container">
        {product ? (
          <div>
            <div className="alert alert-warning">
              <Typography variant="h4" fontWeight={600}>
                {product.item}
              </Typography>
            </div>

            <div className="mt-3 d-flex flex-wrap justify-content-center">
              {productsList.map((c, i) => (
                <div className="col-lg-3 mb-3 me-3" key={i}>
                  <ProductCard {...c} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
