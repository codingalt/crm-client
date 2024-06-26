import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import css from "./Layout.module.scss";
import MobileMenu from "../MobileMenu/MobileMenu";
import { toastError } from "../Toast/Toast";
import { notification, Space } from "antd";
import { Button } from "@nextui-org/react";
import { geocodeLatLng } from "../../utils/helpers/geoCode";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../services/slices/auth/authSlice";

const Layout = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const dispatch = useDispatch();
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
          if(loc){
            return;
          }else{
            // Else Find User Location 
             handleGetLocationByLatLng(
               position.coords.latitude,
               position.coords.longitude
             );
          }
         
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            openNotification();
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
      <div className={css.wrapper}>
        <div className={css.wrapperInner}>
          <Header
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
          />

          {/* Mobile Bottom Navigation Menu  */}
          <MobileMenu />

          <div className={css.container}>
            <Sidebar
              activeSidebar={activeSidebar}
              setActiveSidebar={setActiveSidebar}
            />

            <div className={css.mainContent}>
              {/* Content  */}
              <div className={css.dashboardContent}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
