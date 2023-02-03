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
import { products, productsDetails } from "../../data/productLists";

import { CartContext } from "../../context/CartContext";

export default function ViewProduct() {
  const { cart, setCart } = useContext(CartContext);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [productDetail, setProductDetail] = useState(null);

  const getData = () => {
    setProduct(products.find((c) => c.slug === slug));

    setProductDetail(productsDetails.find((c) => c.slug === slug));
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = (newItem) => {
    setCart(() => [...cart, newItem]);
  };
  return (
    <div>
      <div className="container">
        {product && productDetail ? (
          <div>
            <div className="alert alert-warning">
              <Typography variant="h4" fontWeight={600}>
                {product.item}
              </Typography>
            </div>

            <div className="mt-3 d-flex flex-wrap justify-content-center">
              {productDetail.products.map((c, i) => (
                <div className="col-md-3 mb-3 me-3" key={i}>
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
                      <Typography variant="subtitle2">
                        {c.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography fontWeight={600} fontSize={23}>
                        ₦{c.price.toLocaleString()}
                      </Typography>
                      <Button
                        onClick={() => {
                          addToCart(c);
                        }}
                        className="ms-2"
                        endIcon={<FontAwesomeIcon icon={faCartPlus} />}
                      >
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
