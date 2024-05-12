import React, { useEffect } from "react";
import css from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import user from "../../assets/user.jpg";
import { FaChevronDown } from "react-icons/fa6";
import logo from "../../assets/logo.svg";
import { useMediaQuery } from "@uidotdev/usehooks";

const Header = ({ activeSidebar, setActiveSidebar }) => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const handleChange = () => {};

  return (
    <header className={`${css.Header}`}>
      <div className={css.header_left}>
        <div className={css.logo} onClick={() => isSmallDevice && setActiveSidebar(!activeSidebar)}>
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
      <div className={css.header_right}>
        <div className={css.profile}>
          <img src={user} alt="" />
          <span>Faheem</span>
          <FaChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
