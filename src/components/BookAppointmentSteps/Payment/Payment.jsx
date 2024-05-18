import React, { useMemo } from "react";
import css from "./Payment.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetPaymentIntentMutation } from "../../../services/api/businessProfileApi/businessProfileApi";
import { toastError } from "../../Toast/Toast";

const appearance = {
  // theme: "night",
  labels: "floating",
  variables: {
    fontFamily: ' "Poppins", sans-serif',
    fontLineHeight: "1.5",
    borderRadius: "10px",
    // colorBackground: "#292734",
    colorPrimary: "#01ABAB",
  },
  // rules: {
  //   ".Block": {
  //     backgroundColor: "var(--colorBackground)",
  //     boxShadow: "none",
  //     padding: "12px",
  //   },
  //   ".Input": {
  //     padding: "12px",
  //   },
  //   ".Input:disabled, .Input--invalid:disabled": {
  //     color: "lightgray",
  //   },
  //   ".Tab": {
  //     padding: "10px 12px 8px 12px",
  //     border: "none",
  //   },
  //   ".Tab:hover": {
  //     border: "none",
  //     boxShadow:
  //       "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
  //   },
  //   ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
  //     border: "none",
  //     backgroundColor: "#fff",
  //     boxShadow:
  //       "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
  //   },
  //   ".Label": {
  //     fontWeight: "500",
  //   },
  // },
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [getPaymentIntent, res] = useGetPaymentIntentMutation();
  const { data, isLoading, error, isSuccess } = res;

  const handleGetPaymentIntent = async () => {
    await getPaymentIntent({ amount: 200 });
  };

  useEffect(()=>{
    if(error){
      toastError("Something went wrong. Please try again")
      setLoading(false);
    }
  },[error]);

  useEffect(() => {
    if (isSuccess) {
      setClientSecret(data?.clientSecret);
      // setLoading(false);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [isSuccess]);

  useEffect(() => {
    handleGetPaymentIntent();
  }, []);

  return (
    <>
      {/* Show Loading  */}
      {loading && (
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
            position: "fixed",
            top: "11rem",
            left: "0",
            overflow: "hidden",
            background:"#fff"
          }}
        >
          <ClipLoader color="#01ABAB" size={43} speedMultiplier={0.9} />
        </div>
      )}

      <div className="w-full overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto">
        <div className={css.wrapper}>
          {stripePromise && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <CheckoutForm clientSecret={clientSecret} isLoading={isLoading} />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
