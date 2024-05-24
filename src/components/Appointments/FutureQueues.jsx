import React from 'react'
import css from "./Appointments.module.scss";
import moment from "moment";
import { Chip } from '@nextui-org/react';

const FutureQueues = ({ active, upComing }) => {
  return (
    <div className="w-full mt-6">
      <div
        className={`${css.queues} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-5`}
      >
        {/* Active Appointments  */}
        {active?.map((item) => (
          <div className={css.inner} key={item.id}>
            <h3>{moment(item.appointment_date).format("D MMMM, YYYY")}</h3>
            <div className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  {/* <h4>Motive</h4> */}
                  <Chip color="success">Active</Chip>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={css.cardFooter}>
                <p>{item.service.time} minutes</p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          </div>
        ))}

        {/* Pending Appointments  */}
        {upComing?.map((item) => (
          <div className={css.inner} key={item.id}>
            <h3>{moment(item.appointment_date).format("D MMMM, YYYY")}</h3>
            <div className={css.card}>
              <div className={css.cardHeader}>
                <div className={css.cardTitle}>
                  {/* <h4>Upcoming</h4> */}
                  <Chip color="danger">Upcoming</Chip>
                </div>
              </div>

              <div className={css.cardBody}>
                <p>{item.service.name}</p>
              </div>

              <div className={css.cardFooter}>
                <p>{item.service.time} minutes</p>
                <p>{item.price} Nis</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FutureQueues