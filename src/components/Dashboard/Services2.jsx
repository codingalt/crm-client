import React, { useContext, useState } from "react";
import css from "./Dashboard.module.scss";
import { Button, Tooltip } from "@nextui-org/react";
import { FaRegStar } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { truncateText } from "../../utils/helpers/helpers";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import ServicesSkeleton from "./ServicesSkeleton";
import { useTranslation } from "react-i18next";
import { DirectionContext } from "../../context/DirectionContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { NumericFormat } from "react-number-format";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Rating } from "@mui/material";

const Services2 = ({ data, isLoading, error, refetchServices }) => {
  const { t } = useTranslation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1201px) and (max-width : 1580px)"
  );
  const navigate = useNavigate();
  const { direction } = useContext(DirectionContext);

  const items = data?.map((item) => {
    return (
      <SwiperSlide
        key={item.id}
        onClick={() => navigate(`/service/${item.name}/${item.id}`)}
      >
        <div className={`${css.card}`}>
          <div className={css.image}>
            <ImagePlaceholder
              src={import.meta.env.VITE_SERVICE_IMAGE + item.image}
              width={"100%"}
              height={"100%"}
              isZoomed
            />
          </div>
          <Tooltip
            placement="bottom-start"
            content={item.name}
            hidden={item.name.length < 22}
            classNames={{
              base: [
                // arrow color
                "before:bg-black before:bg-opacity-60 before:rounded-[6px]",
              ],
              content: [
                "py-1 px-2.5 shadow-lg rounded-[6px]",
                "text-white text-[12px] bg-black bg-opacity-60",
              ],
            }}
          >
            <div className={css.title}>{truncateText(item.name, 22)}</div>
          </Tooltip>
          <div className={css.rating}>
            {/* <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar /> */}
            <Rating value={item.rating} readOnly size="small" sx={{fontSize:"1.1rem"}} />
          </div>
          <div className={css.detail}>
            <div className={css.age}>
              <GrContactInfo />
              <span>
                {item.start_age}-{item.end_age} {t("yrs")}
              </span>
            </div>
            <div className={css.time}>
              <LiaBusinessTimeSolid />
              <span>
                {item.time} {t("min")}
              </span>
            </div>
          </div>
          <div
            className={css.price}
            onClick={() => navigate(`/services/${item.name}/${item.id}`)}
          >
            <span>
              <NumericFormat
                displayType="text"
                value={item.price}
                thousandSeparator=","
                thousandsGroupStyle="lakh"
              />{" "}
              {t("get")}
            </span>
          </div>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <>
      <div className="relative w-full">
        <div
          className={`${css.services} servicesDashboard`}
          style={error ? { minHeight: "auto" } : {}}
        >
          {isLoading ? (
            <ServicesSkeleton />
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={isSmallDevice ? 15 : 14}
              slidesPerView={
                isSmallDevice
                  ? 1
                  : isMediumDevice
                  ? 2
                  : isLargeDevice
                  ? 3
                  : isExtraLargeDevice
                  ? 4
                  : 5
              }
              navigation={isSmallDevice ? false : true}
              dir={direction}
              className="swiperContainer"
              // centeredSlides
              freeMode
              grabCursor
            >
              {items}
            </Swiper>
          )}
        </div>
      </div>

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full py-9 h-[230px] flex flex-col gap-2 items-center">
          <p className="font-medium text-[15px] text-[#01abab]">
            Let's try that again.
          </p>
          <span className="px-6 text-xs text-default-600 text-center max-w-xs">
            Oops! Something went wrong. We couldn't fetch the data.
          </span>
          <Button
            size="sm"
            radius="sm"
            className="mt-2 px-6 text-white bg-[#01abab]"
            onClick={refetchServices}
          >
            Try again
          </Button>
        </div>
      )}
    </>
  );
};

export default Services2;
