import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { httpService } from "../../httpService";
import { UserContext } from "../../context/CartContext";
import MySpinner from "../../components/Aesthetics";
import { Avatar, Typography } from "@mui/material";

export default function ConfirmOrder() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { user } = useContext(UserContext);
  //console.log(user);

  const { cartId } = useParams();
  const getCart = async () => {
    setLoading(!loading);
    const { data } = await httpService(`mestore/updatecart/${cartId}`);

    setResponse(data);

    setLoading(!loading);
  };

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <div className="mt-5 mb-5 container">
        {response ? (
          <div className="col-md-4">
            <Typography
              variant="h4"
              fontWeight={600}
              color="#1a237e"
              gutterBottom
            >
              Payment Successful
            </Typography>

            <Typography>
              Dear, {user.firstName} your payment for the items below was
              successful
            </Typography>

            <div className="mt-2">
              {response.newCart.products.map((c, i) => (
                <div key={i} className="mb-2 shadow-sm p-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <Avatar src={c.product.image} />
                    </div>
                    <div>
                      <Typography variant="body1">{c.product.name}</Typography>
                      <Typography variant="body2">
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
                  <Typography variant="h5">Total:</Typography>
                </div>
                <div>
                  <Typography variant="h5">
                    ₦{response.cartAmount[0].CartAmount.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
}
