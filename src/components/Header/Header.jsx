import React, { useEffect } from "react";
import css from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import user from "../../assets/user.jpg";
import { FaChevronDown } from "react-icons/fa6";
import logo from "../../assets/logo.svg";
import { useMediaQuery } from "@uidotdev/usehooks";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

const Header = ({ activeSidebar, setActiveSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const handleChange = () => {};

  return (
    <header className={`${css.Header}`}>
      <div className={`${css.header_left} flex items-center gap-2`}>
        <div
          className={css.logo}
          // onClick={() => isSmallDevice && setActiveSidebar(!activeSidebar)}
        >
          <img src={logo} alt="" />
        </div>
        <div className={css.searchBox}>
          <CiSearch />
          <input onKeyUp={handleChange} type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={`text-[19px] font-medium text-[#01AB8E] md:hidden`}>
        Paycust
      </div>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="#01ABAB"
            name={user?.name}
            size="sm"
            src={`https://i.pravatar.cc/140?u=${user?.id}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <div className={css.header_right}>
        <div className="md:hidden h-10 w-10 rounded-full">
        </div>
        <div className={`${css.profile}`}>
          <img src={user} alt="" />
          <span>Faheem</span>
          <FaChevronDown />
        </div>
      </div> */}
    </header>
  );
};

export default Header;
