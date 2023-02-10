import React, { useState, useEffect } from "react";

import { httpService, loggedInUser } from "../../httpService";

import MySpinner from "../../components/Aesthetics";
import { Avatar, Typography } from "@mui/material";
import { Badge } from "react-bootstrap";

export default function ConfirmOrder() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const getCart = async () => {
    setLoading(!loading);
    const res = await httpService(`mestore/updatecart/${loggedInUser._id}`);

    if (res) {
      setLoading(!loading);
      if (res.status === 303) return window.location.assign("/myorders");

      setResponse(res.data);
      setLoading(!loading);
    }
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <div className="mt-5 mb-5 container">
        {response ? (
          <div className="row">
            <div className="col-lg-6">
              <Typography
                variant="h4"
                fontWeight={600}
                color="#1a237e"
                gutterBottom
              >
                Payment Successful
              </Typography>

              <Typography>
                Dear, <strong>{loggedInUser.firstName}</strong> your payment for
                the items below was successful
              </Typography>

              <div className="mt-2">
                {response.newCart.products.map((c, i) => (
                  <div key={i} className="mb-2 shadow-sm p-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <Avatar src={c.product.image} />
                      </div>
                      <div>
                        <Typography variant="body1" textAlign={"end"}>
                          {c.product.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          textAlign={"end"}
                        >
                          ₦{c.unitPrice.toLocaleString()}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-1">
                <div className="alert alert-primary d-flex justify-content-between">
                  <div>
                    <Typography variant="h6">Total:</Typography>
                  </div>
                  <div>
                    <Typography variant="h6">
                      ₦{response.cartAmount[0].CartAmount.toLocaleString()}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Badge bg="success">
                  {new Date(response.newCart.datePaid).toDateString()}
                </Badge>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center d-none d-lg-block">
              <img
                src="https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="img-fluid shadow"
                alt="success"
              />
            </div>
          </div>
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
}
