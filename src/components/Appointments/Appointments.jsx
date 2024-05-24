import React from 'react'
import css from "./Appointments.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import AppointmentTabs from './AppointmentTabs';

const Appointments = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <h1>My Queues</h1>
        <FaChevronDown />
      </div>

      {/* Tabs  */}
      <div className='mt-7'>
        <AppointmentTabs />
      </div>
    </div>
  );
}

export default Appointments