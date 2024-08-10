import React, { useContext, useEffect, useState } from "react";
import css from "./Header.module.scss";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/logo.svg";
import Avvvatars from "avvvatars-react";
import { useSelector } from "react-redux";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { DirectionContext } from "../../context/DirectionContext";
import LocationIcon from "./LocationIcon";
import AddLocationModal from "./AddLocationModal";
import { truncateText } from "../../utils/helpers/helpers";
import { removeToken } from "../../utils/helpers/tokenUtils";
import SearchServices from "../SearchServices/SearchServices";
import { useMainContext } from "../../context/MainContext";
import { useTranslation } from "react-i18next";
import ChooseLanguageModal from "./ChooseLanguageModal";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let pathname = window.location.pathname;
  const {
    isOpen: isOpenLangModal,
    onOpen: onOpenLangModal,
    onOpenChange: onOpenChangeLangModal,
  } = useDisclosure();
  const { user } = useSelector((store) => store.auth);
  const loc = JSON.parse(localStorage.getItem("userLocation"));
  const {
    setShowSearch,
    isOpenLocationModal,
    onOpenLocationModal,
    onOpenChangeLocationModal,
  } = useMainContext();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  const { direction } = useContext(DirectionContext);

  const handleLogout = () => {
    removeToken();
    window.LogoutEvent.postMessage();
    window.location.reload(false);
  };

  return (
    <>
      {/* Show Search Suggestions Modal  */}
      <SearchServices />

      {/* Choose Language Modal  */}
      <ChooseLanguageModal
        isOpen={isOpenLangModal}
        onOpenChange={onOpenChangeLangModal}
      />

      <div className="sticky top-0 left-0 bg- z-40 overflow-hidden border">
        <header className={`${css.Header}`}>
          <div className={`${css.header_left} flex items-center gap-2`}>
            <div className={css.logo}>
              <img src={logo} alt="" />
            </div>

            <div
              className="w-full h-12 hidden md:flex items-center pl-0 pr-4 lg:px-4 cursor-pointer"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch className="text-xl text-gray-700 lg:text-[#ababab]" />
              <p className="pl-2 lg:pl-4 max-w-[75px] lg:max-w-none overflow-hidden truncate text-sm lg:text-medium font-normal text-[#ababab]">
                {t("searchServices")}
              </p>
            </div>
          </div>

          {loc && loc?.address && (
            <div className={`${css.header_center}`} onClick={onOpenLocationModal}>
              <div className="flex justify-center items-center">
                <button className="outline-none border-none bg-transparent flex items-center justify-center gap-0 md:gap-1">
                  <div className="md:block hidden">
                    <LocationIcon className="text-[#454545] text-[1.15rem]" />
                  </div>
                  <IoLocationOutline className="md:hidden text-[#454545] text-[1.09rem]" />
                  <p className="text-medium m-0 text-[#454545] font-medium text-ellipsis whitespace-nowrap pr-1">
                    <span className="hidden xl:inline-block">
                      {t("newAddress")}
                    </span>
                    <span className="text-[#01ABAB] text-sm md:text-medium inline-block ml-1">
                      {truncateText(loc.address, isSmallDevice ? 19 : 44)}
                    </span>
                  </p>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-7">
            <Dropdown placement="bottom-end" dir={direction}>
              <DropdownTrigger>
                <div className="cursor-pointer">
                  <Avvvatars
                    value={user?.name}
                    size={isSmallDevice ? 33 : 38}
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="signedInAs" className="h-14 gap-2">
                  <p className="font-semibold">{t("signedInAs")}</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigate("/profile")}
                  key="profile"
                >
                  {t("profile")}
                </DropdownItem>
                <DropdownItem onClick={onOpenLangModal} key="languages">
                  {t("languages")}
                </DropdownItem>
                <DropdownItem
                  onClick={handleLogout}
                  key="logout"
                  color="danger"
                >
                  {t("logOut")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>

        {/* Change Location Modal  */}
        <AddLocationModal
          isOpen={isOpenLocationModal}
          onOpenChange={onOpenChangeLocationModal}
        />
      </div>
    </>
  );
};

export default Header;
