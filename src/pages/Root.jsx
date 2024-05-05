import React from "react";
import { Outlet } from "react-router-dom";
import ScrollRestore from "../components/ScrollRestore/ScrollRestore";
import "../styles/global.scss";

const Root = () => {
  return (
    <>
      <wc-toast theme="light"></wc-toast>
      <div className="App w-full h-full">
        <ScrollRestore />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
