import React from 'react'
import css from "./ConfirmTime.module.scss";
import { Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const ConfirmTime = ({ setPage, availableTimeMsg, paginate }) => {
  const { t } = useTranslation();

  return (
    <div className={css.wrapper}>
      <div
        className={`${css.heading} max-w-4xl mx-auto flex justify-between items-center`}
      >
        <span className="flex-1 text-center">{t("confirmTime")}</span>
      </div>

      <div
        className={`${css.card} px-6 py-9 text-center bg-orange-100 w-full max-w-2xl mx-auto rounded-lg`}
      >
        <p>{availableTimeMsg}</p>
      </div>

      <div className={`${css.button} max-w-2xl flex items-center gap-x-3`}>
        <Button onClick={() => setPage([0, 0])}>{t("changeTime")}</Button>
        <Button onClick={() => paginate(1)}>{t("continueAnyway")}</Button>
      </div>
    </div>
  );
};

export default ConfirmTime