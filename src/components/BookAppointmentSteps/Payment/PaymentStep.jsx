import React, { useEffect, useState } from 'react'
import css from "./PaymentStep.module.scss";
import Payment from './Payment';
import { FaArrowLeft } from "react-icons/fa6";

const PaymentStep = ({
  loading,
  setLoading,
  amount,
  setIsConfirmPayment,
  handleBack,
}) => {
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={`${css.paymentStepWrapper} mx-auto`}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
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
          <span className="flex-1 text-center">Make a Payment</span>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto min-h-[60vh]">
        <Payment
          loading={loading}
          setLoading={setLoading}
          amount={amount}
          setIsConfirmPayment={setIsConfirmPayment}
        />
      </div>
    </div>
  );
};

export default PaymentStep