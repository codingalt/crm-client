import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  setIsLoaded,
  setUserLocation,
} from "@/services/slices/auth/authSlice";
import { DirectionContext } from "@/context/DirectionContext";

const libraries = ["places"];

const BaseLayout = () => {
  const { direction } = useContext(DirectionContext);
  const dispatch = useDispatch();
  const loc = JSON.parse(localStorage.getItem("userLocation"));
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries,
  });

  useEffect(() => {
    if (loc) {
      dispatch(setUserLocation(loc));
    }
    dispatch(setIsLoaded(isLoaded));
  }, [isLoaded, dispatch, loc]);

  return (
    <>
      <wc-toast theme="light" limit="1"></wc-toast>
      <div className="App w-full h-full min-h-screen" dir={direction}>
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
