import React from "react";
import css from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@nextui-org/react";

const Appointments = ({ data, isLoading, error, refetchAppointments }) => {
  const { t } = useTranslation();

  return (
    <div
      className={css.queuesWrap}
      style={
        !isLoading &&
        data?.active?.length === 0 &&
        data?.upComing?.length === 0 &&
        data?.completed?.length === 0
          ? { display: "none" }
          : {}
      }
    >
      <h3>{t("appointments")}</h3>

      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-y-5 gap-x-5`}
      >
        {isLoading ? (
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div className={css.card} key={index}>
                <div className={css.cardHeader}>
                  <div className={css.cardTitle}>
                    <Skeleton
                      className="w-28 h-7 rounded-full"
                      disableAnimation
                    />
                  </div>
                </div>

                <div className={css.cardBody}>
                  <Skeleton
                    className="w-48 h-3.5 rounded-md"
                    disableAnimation
                  />
                </div>

                <div
                  className={css.cardFooter}
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <div className="py-1.5"></div>
                </div>
              </div>
            ))
        ) : data?.active?.length > 0 ? (
          data.active.map((item) => (
            <div key={item.id} className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  <div className="bg-[#fdf3f1] font-medium text-sm px-4 md:px-5 py-1 md:py-1.5 rounded-full">
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
          ))
        ) : data?.upComing?.length > 0 ? (
          data.upComing.map((item) => (
            <div key={item.id} className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  <div className="bg-[#ECF3F9] font-medium text-sm px-4 md:px-5 py-1 md:py-1.5 rounded-full">
                    {t("upcoming")}
                  </div>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={`${css.cardFooter} bg-[#ECF3F9]`}>
                <p>
                  {item.service.time} {t("minutes")}
                </p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          ))
        ) : data?.completed?.length > 0 ? (
          data.completed.map((item) => (
            <div key={item.id} className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  <div className="bg-green-600 font-medium text-sm px-4 md:px-5 py-1 md:py-1.5 rounded-full">
                    {t("finished")}
                  </div>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={`${css.cardFooter} bg-green-600`}>
                <p>
                  {item.service.time} {t("minutes")}
                </p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Appointments;
