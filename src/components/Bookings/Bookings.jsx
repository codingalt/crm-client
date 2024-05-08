import React, { useState } from 'react'
import css from "./Bookings.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import user from "../../assets/girl.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiMiniArrowLongRight } from "react-icons/hi2";
import BookingsTable from './BookingsTable';
import FilterByDateModal from './FilterByDateModal';

const Bookings = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>Your Queues</h1>
          <FaChevronDown />
        </div>

        {/* Cards  */}
        <div className={css.cards}>
          <div className={css.inner}>
            <h3>Active</h3>
            <div className={css.card}>
              <div className={css.details}>
                <img src={user} alt="" />
                <div className={css.name}>
                  <p>Zahid Yousaf</p>
                  <span>12:00 - 13:00</span>
                </div>
              </div>

              <div className={css.footer}>
                <p>Service Provider</p>
                <p>Visit Reason</p>
              </div>
            </div>
          </div>

          <div className={css.arrow}>
            <HiMiniArrowLongRight />
          </div>

          {/* Upcoming  */}
          <div className={css.inner}>
            <h3>The Next</h3>
            <div className={css.card} style={{ backgroundColor: "#ECF3F9" }}>
              <div className={css.details}>
                <img src={user} alt="" />
                <div className={css.name}>
                  <p>Muhammad Hateem</p>
                  <span>12:00 - 13:00</span>
                </div>
              </div>

              <div className={css.footer}>
                <p>Service Provider</p>
                <p>Visit Reason</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table  */}
        <BookingsTable setIsModal={setIsModal} />

        {/* Filter Modal  */}
      </div>
        <FilterByDateModal isModal={isModal} setIsModal={setIsModal} />
    </>
  );
}

export default Bookings