import React, { useEffect, useState } from 'react'
import css from "./PaymentStep.module.scss";
import { Button } from '@nextui-org/react';
import Payment from './Payment';

const PaymentStep = ({ loading, setLoading, amount, setIsConfirmPayment }) => {
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={`${css.paymentStepWrapper} mx-auto`}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1 text-center">Make a Payment </span>
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