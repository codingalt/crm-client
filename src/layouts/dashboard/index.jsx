import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import css from "./dashboard-layout.module.scss";
import Header from "./header";
import MobileMenu from "./mobile-menu/MobileMenu";
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <>
      <Header
        activeSidebar={activeSidebar}
        setActiveSidebar={setActiveSidebar}
      />

      {/* Mobile Bottom Navigation Menu */}
      <MobileMenu /> 

      <div className={css.container}>
        <Sidebar
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
        />

        <div className={css.mainContent}>
          <div className={css.dashboardContent}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
