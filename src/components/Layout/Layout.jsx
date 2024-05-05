import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import css from "./Layout.module.scss";

const Layout = ({ children }) => {

  return (
    <div className={css.wrapper}>
      <div className={css.wrapperInner}>
        <Header />
        <div className={css.container}>
          <Sidebar />

          <div className={css.mainContent}>
            {/* Content  */}
            <div className={css.dashboardContent}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout