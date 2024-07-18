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
    isSmallDevice
      ? setValue(2)
      : isMediumDevice
      ? setValue(4)
      : isLargeDevice
      ? setValue(4)
      : isExtraLargeDevice
      ? setValue(6)
      : null;
  }, [isSmallDevice, isMediumDevice, isLargeDevice, isExtraLargeDevice]);

  return (
    <div
      className={`${css.categories} min-h-36 lg:min-h-44 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-4`}
    >
      {isLoading
        ? Array.from({ length: value }).map((_, index) => (
            <Skeleton
              disableAnimation
              key={index}
              className="rounded-lg h-32 md:h-44"
            >
              <div className="w-full rounded-lg bg-secondary"></div>
            </Skeleton>
          ))
        : data?.map((item) => (
            <div
              key={item.id}
              className={css.item}
              onClick={() => navigate(`/categories/${item.name}/${item.id}`)}
            >
              <div className={css.image}>
                <ImageComponent
                  src={import.meta.env.VITE_CATEGORY_IMAGE + item.image}
                  radius={"8px"}
                />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
    </div>
  );
};

export default Categories;
