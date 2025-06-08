import React, { useRef } from "react";
import css from "./sidebar.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import { Badge, Tooltip } from "@nextui-org/react";
import { removeToken } from "@/utils/helpers/tokenUtils";
import { useTranslation } from "react-i18next";
import {
  Calendar1,
  Message,
  ProfileCircle,
  Notification,
  Home2,
  Logout,
} from "iconsax-react";
import useUserData from "@/hooks/useUserData";

const Sidebar = ({ activeSidebar, setActiveSidebar }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const sidebarRef = useRef();
  const { user } = useUserData();

  useClickOutside(sidebarRef, () => setActiveSidebar(false));

  const handleLogout = () => {
    removeToken();
    navigate("/");
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
        <Tooltip content={t("logOut")} placement="right" color="foreground">
          <div
            onClick={handleLogout}
            className={`${css.sidebarLogout} hover:bg-red-50 hover:text-red-500 transition-all`}
          >
            <Logout />
          </div>
        </Tooltip>

        <div className={css.sidebarMenu}>
          <ul style={{ paddingLeft: "0" }}>
            <Tooltip
              content={t("dashboard")}
              placement="right-end"
              color="foreground"
            >
              <li className={css.sidebarli}>
                <NavLink
                  to={"/dashboard"}
                  className={
                    pathname.match("/dashboard") ? css.activeMenuLi : ""
                  }
                >
                  <Home2 />
                </NavLink>
              </li>
            </Tooltip>

            <Tooltip
              content={t("appointments")}
              placement="right-end"
              color="foreground"
            >
              <li className="sidebar-li">
                <NavLink
                  to={"/appointments"}
                  className={
                    pathname.match("/appointments") ? css.activeMenuLi : ""
                  }
                >
                  <Calendar1 />
                </NavLink>
              </li>
            </Tooltip>

            <Tooltip
              content={t("notifications")}
              placement="right-end"
              color="foreground"
            >
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
                      <Notification />
                    </Badge>
                  ) : (
                    <Notification />
                  )}
                </NavLink>
              </li>
            </Tooltip>

            <Tooltip
              content={t("chats")}
              placement="right-end"
              color="foreground"
            >
              <li className="sidebar-li">
                <NavLink
                  to={"/chat"}
                  className={pathname.match("/chat") ? css.activeMenuLi : ""}
                >
                  <Message />
                </NavLink>
              </li>
            </Tooltip>

            <Tooltip
              content={t("profile")}
              placement="right-end"
              color="foreground"
            >
              <li className="sidebar-li">
                <NavLink
                  to={"/profile"}
                  className={pathname.match("/profile") ? css.activeMenuLi : ""}
                >
                  <ProfileCircle />
                </NavLink>
              </li>
            </Tooltip>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
