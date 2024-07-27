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
import LocationHeader from "./LocationHeader";
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

const Header = () => {
  const { t } = useTranslation();
  let pathname = window.location.pathname;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenLangModal, onOpen: onOpenLangModal, onOpenChange: onOpenChangeLangModal } = useDisclosure();
  const { user, location } = useSelector((store) => store.auth);
  const { setShowSearch } = useMainContext();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  const { direction } = useContext(DirectionContext);

  const handleLogout = () => {
    removeToken();
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

      <div
        className="sticky top-0 left-0 bg- z-40 overflow-hidden"
        style={{ boxShadow: "0px 0px 24px 0px rgba(0,0,0,0.16)" }}
      >
        <header className={`${css.Header}`}>
          <div className={`${css.header_left} flex items-center gap-2`}>
            <div className={css.logo}>
              <img src={logo} alt="" />
            </div>

            <div
              className="w-full h-12 hidden md:flex items-center px-4 cursor-pointer"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch className="text-xl text-[#ababab]" />
              <p className="pl-4 text-medium font-normal text-[#ababab]">
                {t("searchServices")}
              </p>
            </div>
          </div>
          {/* <div className={`text-[19px] font-medium text-[#01AB8E] md:hidden`}>
            <button className="outline-none border-none bg-transparent flex items-center justify-center gap-0">
              <LocationIcon className="text-[#656565] text-[1rem]" />
              <p className="text-sm md:text-medium m-0 text-[#454545] font-medium text-ellipsis whitespace-nowrap pr-1">
                <span className="hidden xl:inline-block">
                  {t("newAddress")}
                </span>
                <span className="text-[#01ABAB] inline-block ml-1">
                  {truncateText(location.address, 27)}
                </span>
              </p>
            </button>
          </div> */}

          {location && location?.address && (
            <div className={`${css.header_center}`} onClick={onOpen}>
              <div className="flex justify-center items-center">
                <button className="outline-none border-none bg-transparent flex items-center justify-center gap-0.5 md:gap-1">
                  <div className="md:block hidden">
                  <LocationIcon className="text-[#454545] text-[1.15rem]" />
                  </div>
                  <IoLocationOutline className="md:hidden text-[#454545] text-[1.29rem]" />
                  <p className="text-medium m-0 text-[#454545] font-medium text-ellipsis whitespace-nowrap pr-1">
                    <span className="hidden xl:inline-block">
                      {t("newAddress")}
                    </span>
                    <span className="text-[#01ABAB] inline-block ml-1">
                      {truncateText(location.address, isSmallDevice ? 18 : 44)}
                    </span>
                  </p>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-7">
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
                  <p className="font-semibold">{t("signedInAs")}</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem onClick={onOpenLangModal} key="languages">
                  {t("languages")}
                </DropdownItem>
                <DropdownItem key="help_and_feedback">
                  {t("helpFeedback")}
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

        {/* Location Header Mobile  */}
        {/* {!pathname.includes("/chat") && location && location?.address && (
          <LocationHeader onOpen={onOpen} />
        )} */}

        {/* Change Location Modal  */}
        <AddLocationModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </>
  );
};

export default Header;
