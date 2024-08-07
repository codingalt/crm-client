import React, { useEffect } from "react";
import css from "./Dashboard.module.scss";
import Categories from "./Categories";
import Appointments from "./Appointments";
import Business from "./Business";
import {
  useGetBusinessesQuery,
  useGetGlobalCategoriesQuery,
} from "../../services/api/categoriesApi/categoriesApi";
import { useGetTargetedServicesQuery } from "../../services/api/servicesApi/servicesApi";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Services2 from "./Services2";
import { setUserLocation } from "../../services/slices/auth/authSlice";
import { toastError } from "../Toast/Toast";
import { notification, Space } from "antd";
import { Button } from "@nextui-org/react";
import { geocodeLatLng } from "../../utils/helpers/geoCode";
import { useGetMyBookingsQuery } from "../../services/api/businessProfileApi/businessProfileApi";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { location } = useSelector((store) => store.auth);
  const { data, isLoading, error: errorCategories, refetch: refetchCategories } = useGetGlobalCategoriesQuery();
  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: errorBusinesses,
    refetch: refetchBusinesses,
  } = useGetBusinessesQuery();
  const {
    data: services,
    isLoading: isLoadingServices,
    error: errorServices,
    refetch: refetchServices,
  } = useGetTargetedServicesQuery("Multan", { skip: !location });
  const { data: appointments, isLoading: isLoadingAppointments, error: errorAppointments, refetch: refetchAppointments } = useGetMyBookingsQuery();

  // Get User Location
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button
          className="bg-transparent border"
          size="small"
          variant="bordered"
          onClick={() => {
            api.destroy();
            requestLocation();
          }}
        >
          Allow Location
        </Button>
      </Space>
    );
    api.open({
      message: "We're having trouble finding you",
      description: "Please check your connection and location access.",
      btn,
      key,
      placement: "bottom",
      type: "error",
      duration: null,
    });
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const handleGetLocationByLatLng = async (latitude, longitude) => {
    if (latitude && longitude) {
      const res = await geocodeLatLng({ lat: latitude, lng: longitude });
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          ...res,
          lat: latitude,
          lng: longitude,
          previewAddress: res.address,
        })
      );
      dispatch(
        setUserLocation({
          ...res,
          lat: latitude,
          lng: longitude,
          previewAddress: res.address,
        })
      );
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          api.destroy();
          const loc = JSON.parse(localStorage.getItem("userLocation"));
          // If Location Exist in locastorage then set location to redux slice
          if (loc) {
            return;
          } else {
            // Else Find User Location
            handleGetLocationByLatLng(
              position.coords.latitude,
              position.coords.longitude
            );
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // openNotification();
          }
        }
      );
    } else {
      toastError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {contextHolder}
      <div className={css.dashboardDetails}>
        <div className={css.top}>
          <h1>{t("categories")}</h1>
        </div>

        <Categories
          data={data?.categories}
          isLoading={isLoading}
          error={errorCategories}
          refetchCategories={refetchCategories}
        />

        <div className={css.heading}>
          <h1>{t("services")}</h1>
        </div>
        <Services2
          data={services?.services}
          isLoading={isLoadingServices}
          error={errorServices}
          refetchServices={refetchServices}
        />

        <Appointments data={appointments} isLoading={isLoadingAppointments} error={errorAppointments} refetchAppointments={refetchAppointments} />

        <div className={css.heading}>
          <h1>{t("businesses")}</h1>
        </div>
        <Business
          data={businesses?.businesses}
          isLoading={isLoadingBusinesses}
          error={errorBusinesses}
          refetchBusinesses={refetchBusinesses}
        />
      </div>
    </>
  );
};

export default Dashboard;
