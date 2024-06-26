import React from "react";
import css from "./Dashboard.module.scss";
import Categories from "./Categories";
import Appointments from "./Appointments";
import Business from "./Business";
import {
  useGetBusinessesQuery,
  useGetGlobalCategoriesQuery,
} from "../../services/api/categoriesApi/categoriesApi";
import Services from "./Services";

const Dashboard = () => {
  const { data, isLoading } = useGetGlobalCategoriesQuery();
  const { data: businesses, isLoading: isLoadingBusinesses } =
    useGetBusinessesQuery();

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>Categories</h1>
        </div>

        <Categories data={data?.categories} isLoading={isLoading} />

        <div className={css.heading}>
          <h1>Services</h1>
        </div>
        <Services />

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
