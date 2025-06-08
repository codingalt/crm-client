import React from "react";
import css from "./appointments.module.scss";
import { useTranslation } from "react-i18next";
import { Button, Skeleton } from "@nextui-org/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import FetchDataError from "@/components/widgets/fetch-data-error";

const Appointments = ({ data, isLoading, error, refetchAppointments }) => {
  const { t } = useTranslation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const allAppointments = [
    ...(data?.active || []).map((item) => ({ ...item, status: "active" })),
    ...(data?.upComing || []).map((item) => ({ ...item, status: "upcoming" })),
    ...(data?.completed || []).map((item) => ({
      ...item,
      status: "completed",
    })),
  ];

  const displayedAppointments = allAppointments.slice(0, isSmallDevice ? 5 : 6);

  return (
    <div
      className={`${css.queuesWrap} mt-7`}
      style={
        !isLoading &&
        data?.active?.length === 0 &&
        data?.upComing?.length === 0 &&
        data?.completed?.length === 0
          ? { display: "none" }
          : {}
      }
    >
      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-y-5 sm:gap-y-7 gap-x-7`}
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
        ) : (
          <>
            {displayedAppointments.map((item) => (
              <div key={item.id} className={css.card}>
                <div className={css.cardHeader}>
                  <div className={css.cardTitle}>
                    <div
                      className={`font-medium capitalize text-sm px-4 md:px-5 py-1 md:py-1.5 rounded-full ${
                        item.status === "active"
                          ? "bg-[#fdf3f1]"
                          : item.status === "upcoming"
                          ? "bg-blue-200"
                          : "bg-green-200"
                      }`}
                    >
                      {t(item.status)}
                    </div>
                  </div>
                </div>
                <div className={css.cardBody}>
                  <p>{item.service.name}</p>
                </div>
                <div
                  className={`${css.cardFooter} ${
                    item.status === "active"
                      ? "bg-[#fdf3f1]"
                      : item.status === "upcoming"
                      ? "bg-[#ECF3F9]"
                      : "bg-green-600"
                  }`}
                >
                    <p>
                      {item.service.time} {t("minutes")}
                    </p>
                    <p>{item.price} Nis</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="w-full py-24 md:py-20">
          <FetchDataError refetch={refetchAppointments} />
        </div>
      )}
    </div>
  );
};

export default Appointments;
