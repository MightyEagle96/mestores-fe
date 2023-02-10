import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/productLists";
import { httpService } from "../../httpService";
import { Skeleton } from "@mui/material";

import ProductCard from "./ProductCard";

export default function ViewProduct() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setProduct(products.find((c) => c.slug === slug));
  };

  const getDataFromServer = async () => {
    setLoading(true);
    const { data } = await httpService.get(
      `mestore/viewProducts?category=${slug}`
    );
    if (data) setProductsList(data);

    setLoading(false);
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

        {loading ? (
          <div className="row">
            <div className="col-lg-4">
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="rectangular" height={60} />

              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" height={60} />
            </div>
            <div className="col-lg-4">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="rectangular" height={60} />

              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" height={60} />
            </div>
            <div className="col-lg-4">
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="rectangular" height={60} />

              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" height={60} />
            </div>
          </div>
        ) : (
          <>
            {productsList.length === 0 ? (
              <div className="mt-3 text-center">
                <Typography>No products available for this category</Typography>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
