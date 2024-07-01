import React, { useRef } from "react";
import css from "./Dashboard.module.scss";
import s1 from "../../assets/s1.svg";
import s2 from "../../assets/s2.svg";
import s3 from "../../assets/s3.svg";
import s4 from "../../assets/s4.svg";
import s5 from "../../assets/s5.svg";
import s6 from "../../assets/s6.svg";
import { Image, Tooltip } from "@nextui-org/react";
import { FaRegStar } from "react-icons/fa";
import { GrContactInfo } from "react-icons/gr";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { truncateText } from "../../utils/helpers/helpers";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import logo from "../../assets/logo.svg";
import ImagePlaceholder from "../ui/Image/ImagePlaceholder";

const data = [
  {
    title: "Buttons Stitching",
    time: 45,
    age: "10-45",
    image: s1,
  },
  {
    title: "Se. Citizens Talks for female massage",
    time: 30,
    age: "50-100",
    image: s2,
  },
  {
    title: "Female Massage",
    time: 20,
    age: "10-45",
    image: s3,
  },
  {
    title: "Men Hair Cut",
    time: 40,
    age: "10-60",
    image: s4,
  },
  {
    title: "Male Yoga",
    time: 45,
    age: "35-90",
    image: s5,
  },
  {
    title: "Bridal Makeup",
    time: 40,
    age: "18-60",
    image: s6,
  },
];

const Services = () => {
  const sliderRef = useRef(null);

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleBackClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className={`${css.services} min-h-36 lg:min-h-44`}>
        {data?.map((item, index) => (
          <div key={index} className={`${css.card}`}>
            <div className={css.image}>
              <ImagePlaceholder
                src={item.image}
                width={"100%"}
                height={"100%"}
                isZoomed
              />
            </div>
            <Tooltip
              placement="bottom-start"
              content={item.title}
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
              <div className={css.title}>{truncateText(item.title, 23)}</div>
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
                <span>{item.age} years</span>
              </div>
              <div className={css.time}>
                <LiaBusinessTimeSolid />
                <span>{item.time} min</span>
              </div>
            </div>
            <div className={css.price}>
              <span>$43 Get</span>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={handleBackClick}
        className="absolute -left-8 md:-left-10 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-[#00AEAD] bg-opacity-20 hidden md:flex items-center justify-center text-2xl cursor-pointer rounded-full text-[#01ABAB] z-50"
      >
        <FaChevronLeft />
      </div>

      <div
        onClick={handleNextClick}
        className="absolute right-0 md:-right-10 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-[#00AEAD] bg-opacity-20 hidden md:flex items-center justify-center text-2xl cursor-pointer rounded-full text-[#01ABAB] z-50"
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default Services;
