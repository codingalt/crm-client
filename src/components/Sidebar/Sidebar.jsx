import React, { useEffect, useRef } from "react";
import css from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { Grid, Tooltip } from "@mui/material";
import { TbLogout2 } from "react-icons/tb";
import useClickOutside from "../../hooks/useClickOutside";
import { Badge } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { removeToken } from "../../utils/helpers/tokenUtils";
import { useTranslation } from "react-i18next";
import { Bell, ClipboardList, House, Mail, CircleUser } from "lucide-react";

const Sidebar = ({ activeSidebar, setActiveSidebar }) => {
  const { t } = useTranslation();
  let pathname = window.location.pathname;
  const sidebarRef = useRef();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  useClickOutside(sidebarRef, () => setActiveSidebar(false));

  const handleLogout = () => {
    removeToken();
    window.location.reload(false);
  };

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
        <Tooltip title={t("logOut")} placement="right">
          <div className={css.sidebarProfile}>
            <TbLogout2 onClick={handleLogout} />
          </div>
        </Tooltip>

        <div className={css.sidebarMenu}>
          <ul style={{ paddingLeft: "0" }}>
            <Grid item>
              <Tooltip title={t("dashboard")} placement="right-end">
                <li className={css.sidebarli}>
                  <NavLink
                    to={"/dashboard"}
                    className={
                      pathname.match("/dashboard") ? css.activeMenuLi : ""
                    }
                  >
                    <House />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={t("appointments")} placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/appointments"}
                    className={
                      pathname.match("/appointments") ? css.activeMenuLi : ""
                    }
                  >
                    <ClipboardList />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={t("notifications")} placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/notifications"}
                    className={
                      pathname.match("/notifications") ? css.activeMenuLi : ""
                    }
                  >
                    {user?.notificationCount > 0 ? (
                      <Badge
                        color="danger"
                        content={user?.notificationCount}
                        isInvisible={!user}
                        shape="circle"
                      >
                        <Bell />
                      </Badge>
                    ) : (
                      <Bell />
                    )}
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={t("chats")} placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/chat"}
                    className={pathname.match("/chat") ? css.activeMenuLi : ""}
                  >
                    <Mail />
                  </NavLink>
                </li>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={t("profile")} placement="right-end">
                <li className="sidebar-li">
                  <NavLink
                    to={"/profile"}
                    className={
                      pathname.match("/profile") ? css.activeMenuLi : ""
                    }
                  >
                    <CircleUser />
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
