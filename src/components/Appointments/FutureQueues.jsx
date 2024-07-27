import React from "react";
import css from "./Appointments.module.scss";
import moment from "moment";
import { Chip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const FutureQueues = ({ active, upComing }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full mt-6">
      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-4 md:gap-y-5`}
      >
        {/* Active Appointments  */}
        {active?.map((item) => (
          <div className={css.inner} key={item.id}>
            <h3>{moment(item.appointment_date).format("D MMMM, hh:mm A")}</h3>
            <div className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  <div className="bg-[#fdf3f1] font-medium text-tiny px-3 py-1 rounded-full">
                    {t("active")}
                  </div>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={`${css.cardFooter} bg-[#fdf3f1]`}>
                <p>
                  {item.service.time} {t("minutes")}
                </p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          </div>
        ))}

        {/* Pending Appointments  */}
        {upComing?.map((item) => (
          <div className={css.inner} key={item.id}>
            <h3>{moment(item.appointment_date).format("D MMMM, hh:mm A")}</h3>
            <div className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  <div className="bg-[#ECF3F9] font-medium text-tiny px-3 py-1 rounded-full">
                    {t("upcoming")}
                  </div>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={`${css.cardFooter} bg-[#ECF3F9]`}>
                <p>{item.service.time} {t("minutes")}</p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureQueues;
