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

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>Categories</h1>
        </div>

        <Categories data={data?.categories} isLoading={isLoading} />

        <Appointments />

        <div className={css.heading}>
          <h1>Businesses</h1>
        </div>
        <Business
          data={businesses?.businesses}
          isLoading={isLoadingBusinesses}
        />
      </div>
    </>
  );
};

export default Dashboard;
