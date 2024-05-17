import React, { useState } from "react";
import css from "./Dashboard.module.scss";
import { FaChevronDown } from "react-icons/fa6";
import Categories from "./Categories";
import Appointments from "./Appointments";
import Business from "./Business";
import { useGetBusinessesQuery, useGetGlobalCategoriesQuery } from "../../services/api/categoriesApi/categoriesApi";

const Dashboard = () => {
  const {data, isLoading} = useGetGlobalCategoriesQuery();
  const { data: businesses, isLoading: isLoadingBusinesses } = useGetBusinessesQuery();
  console.log(businesses);

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>Categories</h1>
          <FaChevronDown />
        </div>

        <Categories data={data?.categories} isLoading={isLoading} />

        <Appointments />

        <Business
          data={businesses?.businesses}
          isLoading={isLoadingBusinesses}
        />
      </div>
    </>
  );
};

export default Dashboard;
