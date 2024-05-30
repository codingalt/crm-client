import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { toastError, toastSuccess } from "../../Toast/Toast";
import css from "./Payment.module.scss";
import { Button } from "@nextui-org/react";
import { usePaymentSuccessMutation } from "../../../services/api/businessProfileApi/businessProfileApi";

const CheckoutForm = ({ clientSecret, setIsConfirmPayment }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, result] = usePaymentSuccessMutation();
  const { isLoading, error, isSuccess } = result;

  useMemo(() => {
    if (error) {
      toastError(
        error?.data?.message ? error.data.message : "Something went wrong"
      );
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toastError(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const { data } = await paymentSuccess({
        payment_intent: paymentIntent.id,
      });

      if (data?.success) {
        setIsConfirmPayment(true);
      }
    } else {
      toastError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className={css.paymentForm}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        {clientSecret && (
          <Button
            disabled={loading || !stripe}
            isLoading={loading}
            type="submit"
          >
            {loading || isLoading
              ? "Processing.."
              : "Pay Now to Book Appointment"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
