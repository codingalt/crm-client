import React, { useEffect, useState } from 'react'
import css from "./PaymentStep.module.scss";
import Payment from './Payment';
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const PaymentStep = ({
  loading,
  setLoading,
  amount,
  setIsConfirmPayment,
  handleBack,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className={`${css.paymentStepWrapper} mx-auto`}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <div
          className={`${css.backButton} flex items-center gap-x-4 md:gap-x-12`}
        >
          <div
            onClick={() => handleBack()}
            className="w-9 h-9 md:w-12 md:h-12 cursor-pointer hover:bg-default-50 transition-all text-medium md:text-lg border shadow-sm rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </div>
          <span className="flex-1 text-center">{t("makePayment")}</span>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto min-h-[55vh] md:min-h-[60vh]">
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