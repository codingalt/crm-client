import React from "react";
import css from "./ConfirmPayment.module.scss";
import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import moment from "moment";
import { formatDate } from "..";

const ConfirmPayment = ({
  data,
  date,
  time,
  handleBookAppointment,
  isLoading,
  paymentMethod,
  handleBack,
}) => {
  const { t } = useTranslation();

  const getFormattedTime = () => {
    const formattedTime = dayjs(time).format();
    const formattedDateTime = formatDate(date, formattedTime);

    return formattedDateTime;
  };

  return (
    <div className={css.wrapper}>
      <div
        className={`${css.heading} max-w-2xl mx-auto flex justify-between items-center`}
      >
        <div
          className={`${css.backButton} flex items-center gap-x-3 md:gap-x-12`}
        >
          <div
            onClick={() => handleBack()}
            className="w-9 h-9 md:w-12 md:h-12 cursor-pointer hover:bg-default-50 transition-all text-medium md:text-lg border shadow-sm rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </div>
          <span className="flex-1 text-center">{t("confirmAppointment")}</span>
        </div>
      </div>

      <div className={`${css.card} border w-full max-w-2xl mx-auto rounded-lg`}>
        <div className={css.item}>
          <p>{t("date")}</p>
          <span>{moment(getFormattedTime()).format("DD MMM YYYY")}</span>
        </div>
        <div className={css.item}>
          <p>{t("time")}</p>
          <span>{moment(getFormattedTime()).format("hh:mm A")}</span>
        </div>
        <div className={css.item}>
          <p>{t("price")}</p>
          <span>{data?.price}</span>
        </div>
        <div className={css.item}>
          <p>{t("paymentMethod")}</p>
          <span className="capitalize">{paymentMethod?.name}</span>
        </div>
        <div className={css.footer}>
          <p>{data?.name}</p>
          <span>{data?.price} Nis</span>
        </div>
      </div>

      <div className={`${css.button} max-w-2xl`}>
        <Button isLoading={isLoading} onClick={handleBookAppointment}>
          {t("confirmAppointment")}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
