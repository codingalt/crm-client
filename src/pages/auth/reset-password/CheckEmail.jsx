import React from "react";
import css from "./ResetPassword.module.scss";
import { Button, Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const CheckEmail = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full bg-hintSecondary pb-10">
        <div className="w-full min-h-[90vh] flex flex-col mx-auto">
          <div className="w-full py-6 sm:py-7 px-8 sm:px-16 flex items-center gap-3 mb-4 md:mb-7">
            <div className="w-[40px] md:w-10">
              <Image src={logo} width="100%" height="100%" />
            </div>
            <p className="font-bold text-lg text-[#01abab]">Hint</p>
          </div>
          <div className="w-full pt-6 sm:pt-8 flex items-center justify-center max-w-screen-sm mx-auto">
            <div className={`${css.wrapper} scrollbar-hide`}>
              <div className={css.top}>
                <div className="w-14 h-14 text-[#01abab] text-3xl mb-7 sm:mb-6 rounded-xl border border-gray-300 shadow-sm flex items-center justify-center">
                  <MdOutlineMarkEmailUnread />
                </div>
                <p>
                  <span className="hidden sm:inline-block">{t("please")}</span>{" "}
                  {t("checkEmail")}
                </p>
                <span className="text-default-500 sm:font-medium mt-4 sm:px-2">
                  {t("sentResetLinkText")}
                </span>

                <div className="mt-10 py-3 px-5 border border-gray-300 shadow-sm rounded-lg text-sm">
                  {t("youCanCloseThisPage")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckEmail;
