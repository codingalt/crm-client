import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./header.module.scss";
import { CiSearch } from "react-icons/ci";
import logo from "@/assets/logo.svg";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { DirectionContext } from "@/context/DirectionContext";
import LocationIcon from "@/assets/icons/location-icon";
import AddLocationModal from "@/sections/widget/location/add-location";
import { removeToken } from "@/utils/helpers/tokenUtils";
import SearchServices from "@/sections/widget/search-services";
import { useMainContext } from "@/context/MainContext";
import { useTranslation } from "react-i18next";
import ChooseLanguageModal from "@/sections/widget/language/choose-language-modal";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { cn } from "@/lib/utils";
import useUserData from "@/hooks/useUserData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  let pathname = window.location.pathname;
  const {
    isOpen: isOpenLangModal,
    onOpen: onOpenLangModal,
    onOpenChange: onOpenChangeLangModal,
  } = useDisclosure();
  const { user, isLoading } = useUserData();
  const loc = JSON.parse(localStorage.getItem("userLocation"));

  const {
    setShowSearch,
    isOpenLocationModal,
    onOpenLocationModal,
    onOpenChangeLocationModal,
  } = useMainContext();

  useEffect(() => {
    pathname = window.location.pathname;
  }, [window.location.pathname]);

  const { direction } = useContext(DirectionContext);

  const handleLogout = () => {
    removeToken();
    navigate("/");
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
              <img src={logo} alt="Logo" className="!w-8" />
            </div>
          </div>

          {/* Search Bar  */}
          <div className={`${css.header_center}`}>
            <div
              className="w-full min-w-[540px] h-11 rounded-full border border-[#e2e9ed] hover:border-gray-900 transition-all hidden md:flex items-center px-4 cursor-pointer"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch className="text-xl text-gray-900" />
              <p className="pl-2 overflow-hidden truncate text-sm lg:text-medium font-normal text-gray-900">
                {t("searchServices")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Location Address  */}
            <UserLocation {...{ loc, onOpenLocationModal }} />

            {isLoading ? (
              <AvatarSkeleton />
            ) : user ? (
              user?.avatar ? (
                <Dropdown placement="bottom-end" dir={direction}>
                  <DropdownTrigger>
                    <div className="flex items-center cursor-pointer">
                      <ImagePlaceholder
                        src={user?.avatar}
                        alt={user?.name || "User"}
                        className={cn(
                          "h-10 w-10 md:h-11 md:w-11 rounded-full object-cover border border-gray-200"
                        )}
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
              ) : (
                <div
                  className={cn(
                    "h-10 w-10 md:h-11 md:w-11 rounded-full font-semibold text-lg md:text-xl bg-warning-100 text-warning-600 flex items-center justify-center"
                  )}
                >
                  {(user?.name || "User").charAt(0).toUpperCase()}
                </div>
              )
            ) : (
              <Link to="/login">
                <Button
                  className="px-4 md:px-6 h-9 md:h-10 border-hintPrimary text-hintPrimary hover:text-hintPrimary"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </header>
      </div>

      {/* Change Location Modal  */}
      <AddLocationModal
        isOpen={isOpenLocationModal}
        onOpenChange={onOpenChangeLocationModal}
      />
    </>
  );
};

export default Header;

const UserLocation = ({ loc, onOpenLocationModal }) => {

  return (
    loc &&
    loc?.address && (
      <Tooltip content="Location" color="foreground">
        <button
          onClick={onOpenLocationModal}
          className="w-10 h-10 md:w-11 md:h-11 outline-none border-none bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center rounded-full"
        >
          <div className="block">
            <LocationIcon className="text-[#505050] text-[1.1rem]" />
          </div>
        </button>
      </Tooltip>
    )
  );
};

const AvatarSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="md:h-11 md:w-11 h-10 w-10 rounded-full" />
    </div>
  );
};
