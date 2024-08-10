import React, { useContext, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "../styles/global.scss";
import { useDispatch } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  setIsLoaded,
  setUserLocation,
} from "../services/slices/auth/authSlice";
import { DirectionContext } from "../context/DirectionContext";

const libraries = ["places"];

const Root = () => {
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
      <wc-toast theme="light"></wc-toast>
      <div className="App w-full h-full" dir={direction}>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
