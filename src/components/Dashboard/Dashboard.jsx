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
import { useGetTargetedServicesQuery } from "../../services/api/servicesApi/servicesApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Services2 from "./Services2";

const Dashboard = () => {
  const { t } = useTranslation();
  const { location } = useSelector((store) => store.auth);
  console.log(location);
  const { data, isLoading } = useGetGlobalCategoriesQuery();
  const { data: businesses, isLoading: isLoadingBusinesses } =
    useGetBusinessesQuery();
  const { data: services, isLoading: isLoadingServices } =
    useGetTargetedServicesQuery("Multan", {skip: !location});

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>{t("categories")}</h1>
        </div>

        <Categories data={data?.categories} isLoading={isLoading} />

        <div className={css.heading}>
          <h1>{t("services")}</h1>
        </div>
        <Services2 data={services?.services} isLoading={isLoadingServices} />

        <Appointments />

        <div className={css.heading}>
          <h1>{t("businesses")}</h1>
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
