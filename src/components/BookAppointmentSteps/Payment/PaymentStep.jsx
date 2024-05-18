import React from 'react'
import css from "./PaymentStep.module.scss";
import { Button } from '@nextui-org/react';
import Payment from './Payment';

const PaymentStep = () => {

    const handleNext = () => {
    };

  return (
    <div className={`${css.paymentStepWrapper} mx-auto`}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1">Make Payment </span>
      </div>

      <div className='w-full max-w-3xl mx-auto'>
      <Payment />
      </div>


      {/* Next Button  */}
      {/* <div className={`${css.nextButton} flex-1`}>
        <Button onClick={handleNext}>Proceed</Button>
      </div> */}
    </div>
  );
}

export default PaymentStep