import React from "react";
import css from "./Dashboard.module.scss";
import { useTranslation } from "react-i18next";

const Appointments = () => {
  const { t } = useTranslation();

  return (
    <div className={css.queuesWrap}>
      <h3>{t("appointments")}</h3>

      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5`}
      >
        <div className={css.card}>
          <div className={css.cardHeader}>
            <div className={css.cardTitle}>
              <h4>{t("motive")}</h4>
            </div>
          </div>

          <div className={css.cardBody}>
            <p>
              {t("businesses")} {t("name")}
            </p>
          </div>

          <div className={css.cardFooter}>
            <p>Queue Description</p>
            <p>Some value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
