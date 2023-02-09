import React, { useState, forwardRef, useContext } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { httpService } from "../../httpService";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { UserContext } from "../../context/CartContext";

export default function StripePayment({
  amount,
  account,
  description,
  cartId,
}) {
  const [pi, setPi] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  const getPi = async () => {
    setLoading(!loading);
    const { data } = await httpService.post("mestore/createpayment", {
      amount,
      account,
      description,
    });
    setPi(data);
    setLoading(!loading);
  };

  const options = {
    // passing the client secret obtained from the server
    clientSecret: pi,
  };

  return (
    <div>
      {pi ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        // <Button onClick={getPi}>Pay with card</Button>
        <LoadingButton
          loading={loading}
          loadingPosition="end"
          onClick={getPi}
          endIcon={<FontAwesomeIcon icon={faCreditCard} />}
        >
          <span>pay with card</span>
        </LoadingButton>
      )}
    </div>
  );
}

const CheckoutForm = ({ cartId }) => {
  const stripe = useStripe();
  const [open, setOpen] = React.useState(false);
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(!loading);

    if (!stripe || !elements) {
      setLoading(!loading);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_BASE_URL}paymentsuccessful/${user._id}`,
      },
    });

    if (result.error) {
      setLoading(false);
      handleClick();
      setMessage(result.error.message);
      console.log(result.error.message);
    }
    setLoading(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <LoadingButton
          loadingPosition="end"
          type="submit"
          variant="contained"
          className="mt-2"
          loading={loading}
          endIcon={<FontAwesomeIcon icon={faCreditCard} />}
        >
          <span>pay now</span>
        </LoadingButton>
        {/* <Button type="submit" variant="contained" className="mt-2">
          Pay now
        </Button> */}
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
