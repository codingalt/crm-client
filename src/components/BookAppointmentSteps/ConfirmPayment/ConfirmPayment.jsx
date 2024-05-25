import React from "react";
import css from "./ConfirmPayment.module.scss";
import { Button } from "@nextui-org/react";

const ConfirmPayment = ({ data, handleBookAppointment, isLoading }) => {
  return (
    <div className={css.wrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1 text-center">Confirm Appointment</span>
      </div>

      <div className={`${css.card} border w-full max-w-2xl mx-auto rounded-lg`}>
        <div className={css.item}>
          <p>Price</p>
          <span>{data?.price}</span>
        </div>
        <div className={css.item}>
          <p>Payment Method</p>
          <span>Card</span>
        </div>
        <div className={css.footer}>
          <p>Facial</p>
          <span>Rs. {data?.price}</span>
        </div>
      </div>

      <div className={`${css.button} max-w-2xl`}>
        <Button isLoading={isLoading} onClick={handleBookAppointment}>
          Confirm Payment
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
