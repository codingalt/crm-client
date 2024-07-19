import React, { useEffect } from "react";
import css from "./MobileMenu.module.scss";
import { IoNotificationsSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdListBox } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useMainContext } from "../../context/MainContext";
import { BiSolidSearch } from "react-icons/bi";
import { RiSearchFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";

const MobileMenu = () => {
  const navigate = useNavigate();
  let pathname = window.location.pathname;
  const { user } = useSelector((store) => store.auth);
  const { setShowSearch } = useMainContext();

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  return (
    <div className={`${css.wrapper} block md:hidden`}>
      <div className="fixed shadow-sm z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-b-0 border-gray-200 rounded-none bottom-0 left-1/2">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Tooltip title="Home">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/dashboard") ? "bg-gray-50" : ""
              }`}
              onClick={() => navigate("/dashboard")}
            >
              <AiFillHome className="text-[22px] mb-1 text-[#01ABAB] group-hover:text-[#01ABAB]" />
              <span className="sr-only">Home</span>
            </button>
          </Tooltip>

          <Tooltip title="Appointments">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/appointments") ? "bg-gray-50" : ""
              }`}
              onClick={() => navigate("/appointments")}
            >
              <IoMdListBox className="text-[22px] mb-1 text-[#01ABAB] group-hover:text-[#01ABAB]" />
              <span className="sr-only">Appointments</span>
            </button>
          </Tooltip>

          <Tooltip title="Search">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#01ABAB] rounded-full hover:bg-[#13D3B3] group focus:ring-4 focus:ring-[#13D3B3] focus:outline-none"
                onClick={()=> setShowSearch(true)}
              >
                <FiSearch className="text-[21px] text-white" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </Tooltip>

          {/* <Tooltip title="New Appointment">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#01ABAB] rounded-full hover:bg-[#13D3B3] group focus:ring-4 focus:ring-[#13D3B3] focus:outline-none"
              >
                <FaPlus className="text-[22px] mb-1 text-white" />
                <span className="sr-only">New Appoitment</span>
              </button>
            </div>
          </Tooltip> */}

          <Tooltip title="Notifications">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/notifications") ? "bg-gray-50" : ""
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
                  <IoNotificationsSharp className="text-[22px] mb-1 text-[#01ABAB] group-hover:text-[#01ABAB]" />
                </Badge>
              ) : (
                <IoNotificationsSharp className="text-[22px] mb-1 text-[#01ABAB] group-hover:text-[#01ABAB]" />
              )}

              <span className="sr-only">Notifications</span>
            </button>
          </Tooltip>

          <Tooltip title="Profile">
            <button
              type="button"
              className={`inline-flex flex-col items-center justify-center px-3 rounded-s-full group ${
                pathname.match("/profile") ? "bg-gray-50" : ""
              }`}
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle className="text-[22px] mb-1 text-[#01ABAB] group-hover:text-[#01ABAB]" />
              <span className="sr-only">Profile</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
