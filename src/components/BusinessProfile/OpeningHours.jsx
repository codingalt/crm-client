import React from "react";
import css from "./BusinessProfile.module.scss";
import { IoMoonOutline } from "react-icons/io5";

const OpeningHours = () => {
  return (
    <div className={css.openingHours}>
      <div className={css.box}>
        <ul>
          <li>
            <p>Monday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Tuesday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Wednesday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Thursday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Friday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Saturday</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>Sunday</p>
              <div className={css.right}>
                <div className="flex items-center justify-between w-[71%] px-4 bg-green-50 h-8 rounded-md">
                  <IoMoonOutline />
                  <p
                    style={{
                      color: "#212121",
                      fontSize: ".9rem",
                      fontWeight: "500",
                    }}
                  >
                    Closed
                  </p>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OpeningHours;
