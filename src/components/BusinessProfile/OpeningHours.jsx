import React from "react";
import css from "./BusinessProfile.module.scss";
import { IoMoonOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const OpeningHours = () => {
  const { t } = useTranslation();

  return (
    <div className={css.openingHours}>
      <div className={css.box}>
        <ul>
          <li>
            <p>{t("monday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("tuesday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("wednesday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("thursday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("friday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("saturday")}</p>
            <div className={css.right}>
              <p>9:00Am</p>
              <p>-</p>
              <p>5:00Pm</p>
            </div>
          </li>
          <li>
            <p>{t("sunday")}</p>
            <div className={css.right}>
              <div className="flex items-center justify-between w-[73.6%] md:w-[71%] px-4 bg-green-50 h-8 rounded-md">
                <IoMoonOutline />
                <p
                  style={{
                    color: "#212121",
                    fontSize: ".9rem",
                    fontWeight: "500",
                  }}
                >
                  {t("closed")}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OpeningHours;
