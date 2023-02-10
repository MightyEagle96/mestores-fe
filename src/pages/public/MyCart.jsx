import { faCartShopping, faSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { httpService, loggedInUser } from "../../httpService";
import CheckOutCard from "./CheckOutCard";
import { CartContext, UserContext } from "../../context/CartContext";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import MySpinner from "../../components/Aesthetics";
import StripePayment from "./StripePayment";

export default function MyCart() {
  const [products, setProducts] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCart } = useContext(CartContext);

  const { user } = useContext(UserContext);

  const getCartPrice = async () => {
    const { data } = await httpService(`mestore/cartprice/${loggedInUser._id}`);

    if (data) {
      setCartPrice(data[0].CartAmount);
    }
  };

  const getCart = async () => {
    setLoading(false);
    const { data } = await httpService(
      `mestore/detailedcart/${loggedInUser._id}`
    );

    if (data) {
      setCartId(data._id);
      getCartDescription(data._id);
      setCart(data);
      data.products.forEach((c) => {
        c.getCart = getCart;
        c.getCartPrice = getCartPrice;
      });
      setProducts(data.products);
    }
    setLoading(false);
  };

  const getCartDescription = async (cartId) => {
    const { data } = await httpService(`mestore/cartdescription/${cartId}`);

    if (data) setDescription(data);
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
    <div className="mt-5">
      <div className="container">
        {products.length > 0 ? (
          <>
            {" "}
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
                        <StripePayment
                          amount={cartPrice}
                          account={user._id}
                          description={description}
                          cartId={cartId}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {loading ? (
              <>
                <MySpinner />
              </>
            ) : (
              <div className="row">
                <div className="col-lg-6 d-flex align-items-center">
                  <div>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      color="#e91e63"
                      gutterBottom
                    >
                      Cart Empty
                      <span>
                        <FontAwesomeIcon icon={faSadTear} />
                      </span>
                    </Typography>
                    <Typography variant="body1" color="#ed4b82">
                      You don't have items in your cart.
                      <br /> Please shop for items to populate your cart
                    </Typography>
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                  <img
                    src="https://images.pexels.com/photos/296916/pexels-photo-296916.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="empty cart"
                    className="img-fluid"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
