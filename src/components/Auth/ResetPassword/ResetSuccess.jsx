import React from "react";
import css from "./ResetPassword.module.scss";
import { Button, Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo.svg";
import { MdOutlineCloudDone, MdOutlineMarkEmailUnread } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-[98vh] flex flex-col mx-auto">
        <div className="w-full py-6 sm:py-7 px-8 sm:px-16 flex items-center gap-3 mb-4 md:mb-7">
          <div className="w-[40px] md:w-11">
            <Image src={logo} width="100%" height="100%" />
          </div>
          <p className="font-bold text-lg text-[#01abab]">Hint</p>
        </div>
        <div className="w-full pt-6 sm:pt-0 flex items-center justify-center max-w-screen-sm mx-auto">
          <div className={`${css.wrapper} scrollbar-hide`}>
            <div className={css.top}>
              <div className="w-16 h-16 bg-[#01abab] text-white text-4xl mb-7 sm:mb-6 rounded-2xl border shadow-sm flex items-center justify-center">
                <MdOutlineCloudDone />
              </div>
              <p>{t("allDone")}</p>
              <span className="text-default-500 sm:font-medium mt-4 sm:px-2">
                {t("yourPasswordReset")}
              </span>

              <Button
                className="mt-10 w-full max-w-sm bg-[#01abab] text-white"
                radius="sm"
                size="lg"
                onClick={() => navigate("/")}
              >
                {t("continueToLogin")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetSuccess;
