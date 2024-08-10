import React, { useEffect, useMemo, useState } from "react";
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
import ClipSpinner from "../Loader/ClipSpinner";
import { useMediaQuery } from "@uidotdev/usehooks";

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { location, isLocationChanged } = useSelector((store) => store.auth);
  const loc = JSON.parse(localStorage.getItem("userLocation"));
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [isShow, setIsShow] = useState(loc ? true : false);
  const {
    data,
    isLoading,
    error: errorCategories,
    refetch: refetchCategories,
  } = useGetGlobalCategoriesQuery();
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
  } = useGetTargetedServicesQuery(location ? location.city : "", { skip: !isShow });
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    error: errorAppointments,
    refetch: refetchAppointments,
  } = useGetMyBookingsQuery();
  
  // Fetch Services again when user changes his location 
  useEffect(() => {
    if (isLocationChanged) {
        refetchServices(location.city);
    }
  }, [isLocationChanged]);

  // Get User Location
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    api.open({
      message: "We're having trouble finding you",
      description: "Please check your connection and location access.",
      key,
      placement: "bottom",
      type: "error",
      duration: null,
    });
  };

  useEffect(() => {
    // If Location Exist in locastorage then Continue
    if (loc) {
      return;
    }
    // Else Find User Location
    else {
      requestLocation();
    }
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

      setIsShow(true);
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          api.destroy();

          handleGetLocationByLatLng(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {

          if (error.code === error.PERMISSION_DENIED) {
            openNotification();
            setIsShow(true);
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
      {!isShow ? (
        <div className="w-full h-[85vh] overflow-hidden bg-white flex items-center justify-center">
          <ClipSpinner size={isSmallDevice ? 36 : 40} />
        </div>
      ) : (
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

          <Appointments
            data={appointments}
            isLoading={isLoadingAppointments}
            error={errorAppointments}
            refetchAppointments={refetchAppointments}
          />

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
      )}
    </>
  );
};

export default Dashboard;
