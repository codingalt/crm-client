import React from "react";
import { Skeleton } from "@nextui-org/react";
import css from "./Dashboard.module.scss";
import { useMediaQuery } from "@uidotdev/usehooks";

const ServicesSkeleton = () => {
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

  const placeholders = Array(
    isSmallDevice
      ? 1
      : isMediumDevice
      ? 2
      : isLargeDevice
      ? 3
      : isExtraLargeDevice
      ? 4
      : 5
  ).fill(null);

  return (
    <div className="w-full flex items-center overflow-x-auto scrollbar-hide">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`${css.card} ${
            index === 0
              ? "mr-2 ml-0"
              : index === placeholders.length - 1
              ? "mr-0 mx-2"
              : "mx-2"
          } `}
          style={{
            width: "100%",
            maxWidth: "320px",
            minWidth: "258px",
            marginLeft: isSmallDevice && 0,
          }}
        >
          <div className={css.image}>
            <Skeleton className="w-full h-full rounded-sm" disableAnimation />
          </div>
          <div className={css.title}>
            <Skeleton className="w-36 h-4 rounded-sm" disableAnimation />
          </div>
          <div className={css.rating}>
            <Skeleton className="w-20 h-4 rounded-sm mt-1" disableAnimation />
          </div>
          <div className={css.detail}>
            <div className={css.age}>
              <Skeleton className="w-16 h-3 rounded-sm" disableAnimation />
            </div>
            <div className={css.time}>
              <Skeleton className="w-16 h-3 rounded-sm" disableAnimation />
            </div>
          </div>
          <div
            className={css.price}
            style={{
              backgroundColor: "transparent",
              marginTop: isSmallDevice ? "22px" : "31px",
            }}
          >
            <Skeleton className="w-24 h-3 rounded-sm" disableAnimation />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;
