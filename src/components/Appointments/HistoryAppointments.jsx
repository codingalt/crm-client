import React from "react";
import css from "./Appointments.module.scss";
import moment from "moment"
import { FaStar } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const HistoryAppointments = ({ data, setShow, setRatingData }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full mt-4 md:mt-6">
      {data?.length > 0 && <div className={css.heading}>
        <h3 className="text-[1.4rem] font-medium text-black mb-3 md:mb-4">
          {t("lastMonth")}
        </h3>
      </div>}
      <div
        className={`${css.history} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-4 md:gap-y-5`}
      >
        {data?.map((item) => (
          <div className={css.card} key={item.id}>
            <div className={css.item}>
              <p>{t("appointmentDate")}</p>
              <span>
                {moment(item.appointment_date).format("D MMMM, YYYY")}
              </span>
            </div>
            <div className={css.item}>
              <p>{t("appointmentTime")}</p>
              <span>{moment(item.appointment_date).format("hh:mm A")}</span>
            </div>
            <div className={css.item}>
              <p>{t("service")}</p>
              <span>{item.service.name}</span>
            </div>
            <div className={css.item}>
              <p>{t("price")}</p>
              <span>{item.price} Nis</span>
            </div>

            <div className={css.item}>
              <p>{t("rating")}</p>
              {item.customer_rating && item.customer_comments ? (
                <div className={`flex justify-end gap-2`}>
                  <div className="flex items-center gap-x-1">
                    <FaStar color="#FFA534" />
                    <div className="text-[14px] md:text-[16px] text-[#1c1c1c] opacity-50 font-medium mt-0.5">
                      {item.customer_rating}/5
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  variant="bordered"
                  size="sm"
                  className="border-[#01ABAB] text-[#01ABAB] px-4"
                  type="button"
                  onClick={() => {
                    setRatingData(item);
                    setShow(true);
                  }}
                >
                  {t("rateService")}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryAppointments;
