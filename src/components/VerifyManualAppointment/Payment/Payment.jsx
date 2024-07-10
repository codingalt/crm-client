import React from "react";
import css from "./Payment.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPaymentIntentMutation } from "../../../services/api/businessProfileApi/businessProfileApi";
import { toastError } from "../../Toast/Toast";
import { MdErrorOutline } from "react-icons/md";

const appearance = {
  labels: "floating",
  variables: {
    fontFamily: ' "Poppins", sans-serif',
    fontLineHeight: "1.5",
    borderRadius: "10px",
    colorBackground: "#f7f7f7",
    colorPrimary: "#01ABAB",
  },
  rules: {
    ".Block": {
      backgroundColor: "var(--colorBackground)",
      boxShadow: "none",
      padding: "10px",
    },
    ".Input": {
      padding: "10px",
    },
    ".Input:disabled, .Input--invalid:disabled": {
      color: "lightgray",
    },
    ".Tab": {
      padding: "10px 12px 8px 12px",
      border: "none",
    },
    ".Tab:hover": {
      border: "none",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
    },
    ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
      border: "none",
      backgroundColor: "#fff",
      boxShadow:
        "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
    },
    ".Label": {
      fontWeight: "500",
    },
  },
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = ({ loading, setLoading, amount, setIsConfirmPayment }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [getPaymentIntent, res] = useGetPaymentIntentMutation();
  const { data, isLoading, error, isSuccess } = res;

  const handleGetPaymentIntent = async () => {
    await getPaymentIntent({ amount: amount });
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      setClientSecret(data?.clientSecret);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (amount) {
      handleGetPaymentIntent();
    }
  }, [amount]);

  return (
    <>
      <div className="w-full overflow-x-hidden scrollbar-hide flex justify-center items-center flex-col md:mx-auto">
        <div className={css.wrapper}>
          {stripePromise && clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <CheckoutForm
                clientSecret={clientSecret}
                isLoading={loading}
                setIsConfirmPayment={setIsConfirmPayment}
              />
            </Elements>
          )}

          {/* Handle Error  */}
          {!loading && error && (
            <div className="w-full py-40 md:py-20 px-5 md:px-0 -mt-3 flex flex-col gap-2 justify-center items-center mx-auto">
              <MdErrorOutline className="text-[#01ABAB] text-[45px]" />
              <p className="text-medium text-default-900 font-semibold">
                Something went wrong
              </p>
              <p className="text-sm text-default-700 font-medium text-center">
                Please try again later.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
