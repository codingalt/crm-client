import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.scss";
import { FaStethoscope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@nextui-org/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ImageComponent from "../ui/Image/ImageComponent";

const Categories = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(data);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 1280px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 1281px) and (max-width : 1536px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1537px)"
  );

  useEffect(() => {
    const handleResize = () => {
      if (data && window.innerWidth <= 768) {
        // Mobile devices
        setVisibleCategories(data.slice(0, 6));
      } else {
        // Larger devices
        setVisibleCategories(data);
      }
    };

    handleResize(); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  useEffect(() => {
    isSmallDevice
      ? setValue(6)
      : isMediumDevice
      ? setValue(6)
      : isLargeDevice
      ? setValue(8)
      : isExtraLargeDevice
      ? setValue(8)
      : null;
  }, [isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice]);

  return (
    <div className="lg:overflow-x-auto lg:scroll-x lg:scrollbar-hide lg:snap-mandatory lg:snap-x lg:scroll-smooth">
      {/* <div
        className={`${css.categories} scrollbar-hide min-h-36 lg:min-h-44 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-5 md:gap-x-5 gap-y-4`}
      > */}
      <div className={`${css.categories} w-full scrollbar-hide`}>
        {isLoading
          ? Array.from({ length: value }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3 px-[6px]">
                <Skeleton
                  disableAnimation
                  className="rounded-2xl h-[98px] lg:h-[135px]"
                >
                  <div className="w-full rounded-lg bg-secondary"></div>
                </Skeleton>
                <Skeleton
                  disableAnimation
                  className="block lg:hidden rounded-2xl w-[75%] lg:w-[84%] h-2 mx-auto"
                >
                  <div className="rounded-lg bg-secondary"></div>
                </Skeleton>
              </div>
            ))
          : visibleCategories?.map((item) => (
              <div
                key={item.id}
                className={`${css.itemWrap} flex justify-center items-center md:p-1.5`}
              >
                <div
                  className={`${css.item} transition-all`}
                  onClick={() =>
                    navigate(`/categories/${item.name}/${item.id}`)
                  }
                >
                  <div className={css.image}>
                    <ImageComponent
                      src={import.meta.env.VITE_CATEGORY_IMAGE + item.image}
                      radius={"8px"}
                    />
                  </div>
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categories;
