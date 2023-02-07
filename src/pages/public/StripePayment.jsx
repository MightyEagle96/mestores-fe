import React, { useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { httpService } from "../../httpService";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

export default function StripePayment({ amount }) {
  const [pi, setPi] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  const getPi = async () => {
    setLoading(!loading);
    const { data } = await httpService.post("mestore/createpayment", {
      amount,
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

const CheckoutForm = () => {
  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
    });

    console.log(result);

    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" variant="contained" className="mt-2">
        Pay now
      </Button>
    </form>
  );
};
