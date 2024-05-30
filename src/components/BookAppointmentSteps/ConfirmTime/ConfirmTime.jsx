import React from 'react'
import css from "./ConfirmTime.module.scss";
import { Button } from '@nextui-org/react';

const ConfirmTime = ({ setPage, availableTimeMsg, paginate }) => {
  return (
    <div className={css.wrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1 text-center">Confirm Time</span>
      </div>

      <div
        className={`${css.card} px-6 py-9 text-center bg-orange-100 w-full max-w-2xl mx-auto rounded-lg`}
      >
        <p>{availableTimeMsg}</p>
      </div>

      <div className={`${css.button} max-w-2xl flex items-center gap-x-3`}>
        <Button onClick={() => setPage([0, 0])}>Change Time</Button>
        <Button onClick={() => paginate(1)}>Continue anyway</Button>
      </div>
    </div>
  );
};

export default ConfirmTime