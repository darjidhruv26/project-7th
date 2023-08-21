import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NdZ2MSHE4fCvIOPgfs0EaVDl1LCqGefzW00xIAcIt0kVHD40RWdayMSoBxQ3c4cFSH41SCjrrWeiF93JNZlMQDf00QdGRFEkc"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const params = useParams();
  const email = JSON.parse(localStorage.getItem("user"))?.data.email;

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: params.courseId, email }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [params.courseId, email]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex justify-center mt-9">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm courseId={params.courseId} />
        </Elements>
      )}
    </div>
  );
}
