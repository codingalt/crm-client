import React, { useState } from "react";
import css from "./Dashboard.module.scss";
import { Image, Tooltip } from "@nextui-org/react";
import { FaRegStar } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { truncateText } from "../../utils/helpers/helpers";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import ServicesSkeleton from "./ServicesSkeleton";
import { useTranslation } from "react-i18next";

const Services = ({ data, isLoading }) => {
  const { t } = useTranslation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const responsive = {
    0: { items: 1 },
    464: { items: 2 },
    1024: { items: 3 },
    1280: { items: 4 },
    1580: { items: 5 },
  };

  const slidePrev = () => setActiveIndex((prevIndex) => prevIndex - 1);
  const slideNext = () => setActiveIndex((prevIndex) => prevIndex + 1);

  // Custom arrow components
  const CustomPrevButton = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute -left-8 md:-left-12 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-[#00AEAD] bg-opacity-20 hidden md:flex items-center justify-center text-2xl cursor-pointer rounded-full text-[#01ABAB] z-20"
    >
      <FaChevronLeft />
    </div>
  );

  const CustomNextButton = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-0 md:-right-10 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-[#00AEAD] bg-opacity-20 hidden md:flex items-center justify-center text-2xl cursor-pointer rounded-full text-[#01ABAB] z-20"
    >
      <FaChevronRight />
    </div>
  );

  const items = data?.map((item, index) => {
    return (
      <div key={item.id} className={`${css.card} mx-2`}>
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
          classNames={{
            base: [
              // arrow color
              "before:bg-[#01ABAB]",
            ],
            content: [
              "py-1.5 px-2.5 shadow-lg",
              "text-white text-[13px] bg-[#01ABAB]",
            ],
          }}
        >
          <div className={css.title}>{truncateText(item.name, 23)}</div>
        </Tooltip>
        <div className={css.rating}>
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
        </div>
        <div className={css.detail}>
          <div className={css.age}>
            <GrContactInfo />
            <span>
              {item.start_age}-{item.end_age} yrs
            </span>
          </div>
          <div className={css.time}>
            <LiaBusinessTimeSolid />
            <span>{item.time} min</span>
          </div>
        </div>
        <div
          className={css.price}
          onClick={() => navigate(`/services/${item.name}/${item.id}`)}
        >
          <span>
            ${item.price} {t("get")}
          </span>
        </div>
      </div>
    );
  });

  const syncActiveIndexForSwipeGestures = (e) => setActiveIndex(e.item);

  const onSlideChanged = (e) => {
    syncActiveIndexForSwipeGestures(e);
  };

  return (
    <div className="relative w-full">
      <div className={`${css.services} min-h-36 lg:min-h-44`}>
        {isLoading ? (
          <ServicesSkeleton />
        ) : (
          <AliceCarousel
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={responsive}
            onSlideChanged={onSlideChanged}
            disableDotsControls
            renderPrevButton={() => <CustomPrevButton onClick={slidePrev} />}
            renderNextButton={() => <CustomNextButton onClick={slideNext} />}
            keyboardNavigation
            touchMoveDefaultEvents
            paddingRight={isSmallDevice ? 20 : 0}
          />
        )}
      </div>
    </div>
  );
};

export default Services;
