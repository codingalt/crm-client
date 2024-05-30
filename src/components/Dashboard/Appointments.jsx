import React from "react";
import css from "./Dashboard.module.scss";

const Appointments = () => {
  return (
    <div className={css.queuesWrap}>
      <h3>Appointments</h3>

      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5`}
      >
        <div className={css.card}>
          <div className={css.cardHeader}>
            <div className={css.cardTitle}>
              <h4>Motive</h4>
            </div>
          </div>

          <div className={css.cardBody}>
            <p>Business Name</p>
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
