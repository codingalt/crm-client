import React, { useEffect, useRef, useState } from "react";
import css from "./Sidebar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Grid, Tooltip } from "@mui/material";
import { FaLightbulb } from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";
import useClickOutside from "../../hooks/useClickOutside";
import { FaUser } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { IoNotificationsSharp } from "react-icons/io5";

const Sidebar = ({ activeSidebar, setActiveSidebar }) => {
  let pathname = window.location.pathname;
  const sidebarRef = useRef();

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  useClickOutside(sidebarRef, () => setActiveSidebar(false));

  return (
    <>
      <input type="checkbox" id="nav-toggle" hidden />
      <div
        className={
          activeSidebar ? `${css.sidebar} ${css.sidebarActive}` : css.sidebar
        }
        id="sidebar"
        ref={sidebarRef}
      >
        <div className={css.sidebarProfile}>
          <FaLightbulb />
          <LuClock4 />
        </div>
        <div className={css.sidebarMenu}>
          <ul style={{ paddingLeft: "0" }}>
            <Grid item>
              <Tooltip title="Dashboard" placement="right-end">
                <li className={css.sidebarli}>
                  <NavLink
                    to={"/dashboard"}
                    className={
                      pathname.match("/dashboard") ? css.activeMenuLi : ""
                    }
                  >
                    <AiFillHome />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Appointments" placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/appointments"}
                    className={
                      pathname.match("/appointments") ? css.activeMenuLi : ""
                    }
                  >
                    <IoMdListBox />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Notifications" placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"#"}
                    className={pathname.match("#") ? css.activeMenuLi : ""}
                  >
                    <IoNotificationsSharp />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Profile" placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/profile"}
                    className={
                      pathname.match("/profile") ? css.activeMenuLi : ""
                    }
                  >
                    <FaUser />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
