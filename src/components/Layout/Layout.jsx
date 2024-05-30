import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import css from "./Layout.module.scss";
import MobileMenu from '../MobileMenu/MobileMenu';

const Layout = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
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
  );
};

export default Layout