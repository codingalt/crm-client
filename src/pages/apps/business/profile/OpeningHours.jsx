import React from "react";
import css from "./BusinessProfile.module.scss";
import { IoMoonOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const OpeningHours = ({ data, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className={css.openingHours}>
      <div className={`${css.box} min-h-80`}>
        <ul>
          {isLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} className="rounded-lg h-4 mb-7" />
              ))
            : data?.openingHours?.map((item, index) =>
                parseInt(item.close) === 0 ? (
                  <li key={item.day_of_week + index}>
                    <p>{item.day_of_week}</p>
                    <div className={css.right}>
                      <p>
                        {moment(item.open_time, "HH:mm:ss").format("hh:mm A")}
                      </p>
                      <p>-</p>
                      <p>
                        {moment(item.close_time, "HH:mm:ss").format("hh:mm A")}
                      </p>
                    </div>
                  </li>
                ) : (
                  <li key={item.day_of_week + index}>
                    <p>{item.day_of_week}</p>
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
                )
              )}
        </ul>
      </div>
    </div>
  );
};

export default OpeningHours;
