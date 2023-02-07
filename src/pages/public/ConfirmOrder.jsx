import React from "react";
import { useParams } from "react-router-dom";

export default function ConfirmOrder() {
  const { cartId } = useParams();

  console.log(cartId);
  return (
    <div>
      <div className="mt-5 mb-5 container">Hello</div>
    </div>
  );
}
