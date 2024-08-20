import React, { useEffect } from "react";
import css from "./MobileMenu.module.scss";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@nextui-org/react";
import {
  Bell,
  BellDot,
  ClipboardList,
  House,
  Mail,
  Search,
} from "lucide-react";

const MobileMenu = () => {
  const navigate = useNavigate();
  let pathname = window.location.pathname;
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  return (
    <div
      className={`${css.wrapper} block md:hidden`}
      style={pathname.match("/chat") ? { display: "none" } : {}}
    >
      <div className="fixed shadow-xl z-50 w-full h-[63px] max-w-lg -translate-x-1/2 bg-white border border-b-0 border-gray-200 rounded-none bottom-0 left-1/2">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Tooltip title="Home">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/dashboard")
                  ? "text-[#01ABAB]"
                  : "text-gray-500"
              }`}
              onClick={() => navigate("/dashboard")}
            >
              <House className="text-[19px] mb-1" size={23} />
              <span className="sr-only">Home</span>
            </button>
          </Tooltip>

          <Tooltip title="Search">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                  pathname.match("/search") ? "text-[#01ABAB]" : "text-gray-500"
                }`}
                onClick={() => {
                  navigate("/search");
                }}
              >
                <Search className="text-[19px] mb-1" size={23} />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </Tooltip>

          <Tooltip title="Appointments">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/appointments")
                  ? "text-[#01ABAB]"
                  : "text-gray-500"
              }`}
              onClick={() => navigate("/appointments")}
            >
              <ClipboardList className="text-[19px] mb-1" size={23} />
              <span className="sr-only">Appointments</span>
            </button>
          </Tooltip>

          <Tooltip title="Notifications">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/notifications")
                  ? "text-[#01ABAB]"
                  : "text-gray-500"
              }`}
              onClick={() => navigate("/notifications")}
            >
              {user?.notificationCount > 0 ? (
                <Badge
                  color="danger"
                  content={user?.notificationCount}
                  isInvisible={!user}
                  shape="circle"
                >
                  <BellDot className="text-[19px] mb-1" size={23} />
                </Badge>
              ) : (
                <Bell className="text-[19px] mb-1" size={23} />
              )}

              <span className="sr-only">Notifications</span>
            </button>
          </Tooltip>

          <Tooltip title="Chats">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/chat") ? "text-[#01ABAB]" : "text-gray-500"
              }`}
              onClick={() => navigate("/chat")}
            >
              <Mail className="text-[19px] mb-1" size={23} />
              <span className="sr-only">Chats</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
