import React from "react";
import css from "./dashboard.module.scss";
import Categories from "./category/category";
import Business from "./business/business";
import { useTranslation } from "react-i18next";
import ServicesCarousel from "@/sections/common/service-carousel";
import { useGetDashboardDataQuery } from "@/services/api/dashboardApi/dashboardApi";
import FetchDataError from "@/components/widgets/fetch-data-error";

const DashboardPage = () => {
  const { t } = useTranslation();

  const { data, isLoading, error, refetch } = useGetDashboardDataQuery();
  const res = data?.data;

  if (!isLoading && error) {
    return (
      <div className="py-28">
        <FetchDataError refetch={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className={css.dashboardDetails}>
        <div className={`${css.topHeader}`}>
          <h1>{t("categories")}</h1>
        </div>

        <Categories data={res?.categories} isLoading={isLoading} />

        <div className={css.heading}>
          <h1>Recommended</h1>
        </div>
        <div className={`${css.services} mt-5 md:mt-7`}>
          <ServicesCarousel
            data={res?.services}
            id="recommended"
            desktopLength={5}
            isLoading={isLoading}
          />
        </div>

        <div className={css.heading}>
          <h1>Trending this Month</h1>
        </div>
        <div className={`${css.services} mt-5 md:mt-7`}>
          <ServicesCarousel
            data={res?.services}
            id="trending"
            desktopLength={5}
            isLoading={isLoading}
          />
        </div>

        <div className={css.heading}>
          <h1>{t("businesses")}</h1>
        </div>
        <Business data={res?.businesses} isLoading={isLoading} />
      </div>
    </>
  );
};

export default DashboardPage;
