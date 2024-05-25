import React from "react";
import css from "./Appointments.module.scss";
import moment from "moment"

const HistoryAppointments = ({data}) => {
  return (
    <div className="w-full mt-6">
      <div className={css.heading}>
        <h3 className="text-[1.4rem] font-medium text-black mb-4">
          Last Month
        </h3>
      </div>
      <div
        className={`${css.history} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-5 gap-y-5`}
      >
        {data?.map((item) => (
          <div className={css.card} key={item.id}>
            <div className={css.item}>
              <p>Appointment Date</p>
              <span>
                {moment(item.appointment_date).format("D MMMM, YYYY")}
              </span>
            </div>
            <div className={css.item}>
              <p>Appointment Time</p>
              <span>
                {moment(item.appointment_date).format("hh:mm A")}
              </span>
            </div>
            <div className={css.item}>
              <p>Service</p>
              <span>{item.service.name}</span>
            </div>
            <div className={css.item}>
              <p>Price</p>
              <span>{item.price} Nis</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryAppointments;
