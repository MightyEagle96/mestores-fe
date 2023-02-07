import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { httpService, loggedInUser } from "../../httpService";
import CheckOutCard from "./CheckOutCard";
import { CartContext, UserContext } from "../../context/CartContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import StripePayment from "./StripePayment";

export default function MyCart() {
  const [products, setProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const { setCart } = useContext(CartContext);

  const { user } = useContext(UserContext);

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

  const handleGoogleLogin = async (obj) => {
    const { data } = await httpService.patch(
      `mestore/googleAccount/${loggedInUser._id}`,
      obj
    );

    if (data) {
      localStorage.setItem(
        process.env.REACT_APP_PROJECT_USER,
        JSON.stringify(data)
      );

      window.location.reload();
    }
  };

  return (
    <GoogleOAuthProvider clientId="1038881009037-lmfer8u0ogoqlh4floj5gt5iv88deh6e.apps.googleusercontent.com">
      <div className="mt-5">
        <div className="container">
          <Typography variant="h6" fontWeight={900} color="grey">
            My Cart
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
          </Typography>
          <hr />

          <div className="mt-2">
            <div className="row">
              <div className="col-lg-6">
                {products.map((c, i) => (
                  <CheckOutCard {...c} key={i} />
                ))}
              </div>
              <div className="col-lg-6 bg-light p-5">
                <div>
                  <Typography gutterBottom variant="body1" color="#303f9f">
                    Amount to pay
                  </Typography>
                  <Typography variant="h3" fontWeight={600} color="#1a237e">
                    ₦{cartPrice.toLocaleString()}.00
                  </Typography>

                  <div className="mt-2">
                    {/* <Button>Login to continue to checkout</Button> */}
                    {loggedInUser && loggedInUser.isGuest ? (
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          const data = jwt_decode(
                            credentialResponse.credential
                          );

                          const update = {
                            email: data.email,
                            firstName: data.given_name,
                            lastName: data.family_name,
                            authMethod: "Google",
                            picture: data.picture,
                          };
                          handleGoogleLogin(update);
                        }}
                        onError={() => {}}
                      />
                    ) : null}

                    {user && !user.isGuest ? (
                      <StripePayment amount={cartPrice} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
