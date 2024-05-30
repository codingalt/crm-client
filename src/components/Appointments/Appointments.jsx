import React, { useState } from "react";
import css from "./Appointments.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import AppointmentTabs from "./AppointmentTabs";
import RatingModal from "../Rating/RatingModal";

const Appointments = () => {
  const [show, setShow] = useState(false);
  const [ratingData, setRatingData] = useState(null);

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.top}>
          <h1>My Queues</h1>
        </div>

        {/* Tabs  */}
        <div className="mt-7">
          <AppointmentTabs setRatingData={setRatingData} setShow={setShow} />
        </div>
        <RatingModal show={show} setShow={setShow} data={ratingData} />
      </div>

      {/* Rating Modal  */}
    </>
  );
};

export default Appointments;
