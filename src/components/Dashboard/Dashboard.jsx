import React, { useState } from "react";
import css from "./Dashboard.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import Categories from "./Categories";
import Appointments from "./Appointments";
import Business from "./Business";

const Dashboard = () => {
  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>Categories</h1>
          <FaChevronDown />
        </div>

        <Categories />

        <Appointments />

        <Business />
      </div>
    </>
  );
};

export default Dashboard;
