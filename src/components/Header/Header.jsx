import React, { useContext, useEffect, useMemo, useState } from "react";
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
  Image,
  Tooltip,
} from "@nextui-org/react";
import ukFlag from "../../assets/uk.png";
import pakFlag from "../../assets/pakistan.png";
import israelFlag from "../../assets/israel.png";
import { DirectionContext } from "../../context/DirectionContext";
import i18n from "../../i18n";

const Header = ({ activeSidebar, setActiveSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const handleChange = () => {};

  const storedLanguage = localStorage.getItem("language") || i18n.language;

  const [selectedKeys, setSelectedKeys] = useState(new Set([storedLanguage]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const { toggleLanguage, direction } = useContext(DirectionContext);

  const handleLogout = () => {
    localStorage.removeItem("crmClientToken");
    window.location.reload(false);
  };

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

      <div className="flex items-center space-x-7">
        <Dropdown dir={direction}>
          <DropdownTrigger>
            <div className="flex items-center space-x-1.5 cursor-pointer">
              <Tooltip dir={direction} size="sm" content="Select Language">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full">
                  <Image
                    src={
                      selectedValue === "en"
                        ? ukFlag
                        : selectedValue === "pk"
                        ? pakFlag
                        : israelFlag
                    }
                    width={50}
                    height={50}
                    radius="full"
                  />
                </div>
              </Tooltip>
              <span>|</span>
              <span>{i18n.language}</span>
            </div>
          </DropdownTrigger>
          <DropdownMenu
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            onAction={(key) => toggleLanguage(key)}
            variant="faded"
            aria-label="Dropdown menu with icons"
          >
            <DropdownItem
              key="en"
              startContent={
                <Image src={ukFlag} width={27} height={27} radius="full" />
              }
            >
              English
            </DropdownItem>
            <DropdownItem
              key="pk"
              startContent={
                <Image src={pakFlag} width={27} height={27} radius="full" />
              }
            >
              Pakistan
            </DropdownItem>
            <DropdownItem
              key="israel"
              startContent={
                <Image src={israelFlag} width={27} height={27} radius="full" />
              }
            >
              Israeli
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom-end" dir={direction}>
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
            <DropdownItem key="languages">Languages</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={handleLogout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
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
