import React, { useEffect } from "react";
import css from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import user from "../../assets/user.jpg";
import { FaChevronDown } from "react-icons/fa6";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleChange = () => {};

  return (
    <header className={`${css.Header}`}>
      <div className={css.header_left}>
        <div className={css.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={css.searchBox}>
          <CiSearch />
          <input onKeyUp={handleChange} type="text" placeholder="Search..." />
        </div>
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
