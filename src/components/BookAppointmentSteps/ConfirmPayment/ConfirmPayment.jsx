import React from "react";
import css from "./ConfirmPayment.module.scss";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";

const ConfirmPayment = ({
  data,
  handleBookAppointment,
  isLoading,
  paymentMethod,
  handleBack,
}) => {
  return (
    <div className={css.wrapper}>
      <div
        className={`${css.heading} max-w-2xl mx-auto flex justify-between items-center`}
      >
        <div
          className={`${css.backButton} flex items-center gap-x-6 md:gap-x-12`}
        >
          <div
            onClick={() => handleBack()}
            className="w-12 h-12 cursor-pointer hover:bg-default-50 transition-all text-lg border shadow-sm rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </div>
          <span className="flex-1 text-center">Confirm Appointment</span>
        </div>
      </div>

      <div className={`${css.card} border w-full max-w-2xl mx-auto rounded-lg`}>
        <div className={css.item}>
          <p>Price</p>
          <span>{data?.price}</span>
        </div>
        <div className={css.item}>
          <p>Payment Method</p>
          <span className="capitalize">{paymentMethod}</span>
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
