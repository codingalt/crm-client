import React from 'react'
import css from "./Bookings.module.scss";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { RiFilter3Fill } from "react-icons/ri";

const BookingsTable = ({ setIsModal }) => {
  return (
    <div className={css.bookingsTable}>
      <div className={css.hoursHeading}>Hours</div>
      <div className={css.table}>
        <div className={css.hoursCol}>
          <div className={css.item}></div>
          <div className={css.item}></div>
          <div className={css.item}>9:00</div>
          <div className={css.item}>10:00</div>
          <div className={css.item}>11:00</div>
          <div className={css.item}>12:00</div>
        </div>

        <div className={css.tableData}>
          <div className="w-full flex items-center justify-between">
            <h3>Today</h3>
            <div
              onClick={() => setIsModal(true)}
              className="md:w-12 md:h-12 text-[25px] md:text-[28px] h-10 w-10 bg-[#01AB8E] cursor-pointer rounded-xl shadow-md flex justify-center items-center"
            >
              <RiFilter3Fill
                className="text-default-600"
                color="#fff"
              />
            </div>
          </div>
          <div className={`${css.employeesTable}`}>
            {/* Table Header  */}
            <div className={css.tableHeader}>
              <div className={css.item}>Customer Name</div>
              <div className={css.item}>Visit Reason</div>
              <div className={css.item}>Service Provider</div>
              <div className={css.item}>Payment</div>
              <div className={css.item}>
                <div className="bg-[#01AB8E] w-24 md:w-28 flex text-[12px] md:text-[14px] justify-center items-center text-white rounded-full px-0 md:px-7 py-1">
                  Approval
                </div>
              </div>
              <div className={css.item}>
                <div className="text-[#454B4A]">
                  <RxCross2 fontSize={22} />
                </div>
              </div>
            </div>

            {/* Table Body  */}
            <div className={css.tableBody}>
              <div className={css.tableRow}>
                <p>Zahid Yousaf</p>
                <p>Aaaaa</p>
                <p>Aaaaa</p>
                <p>35 Nis</p>
                <p>
                  <MdDone fontSize={24} color="#01AB8E" />
                </p>
                <p>Details</p>
              </div>
              <div className={css.tableRow}>
                <p>Faheem Malik</p>
                <p>Aaaaa</p>
                <p>Aaaaa</p>
                <p>35 Nis</p>
                <p>
                  {" "}
                  <MdDone fontSize={24} color="#01AB8E" />
                </p>
                <p>Details</p>
              </div>
              <div className={css.tableRow}>
                <p>Muhammad Hateem</p>
                <p>Aaaaa</p>
                <p>Aaaaa</p>
                <p>35 Nis</p>
                <p>
                  {" "}
                  <MdDone fontSize={24} color="#01AB8E" />
                </p>
                <p>Details</p>
              </div>
              <div className={css.tableRow}>
                <p>Arya Stark</p>
                <p>Aaaaa</p>
                <p>Aaaaa</p>
                <p>35 Nis</p>
                <p>
                  {" "}
                  <MdDone fontSize={24} color="#01AB8E" />
                </p>
                <p>Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable