import React from "react";
import { Skeleton } from "@nextui-org/react";
import css from "./Dashboard.module.scss";
import { useMediaQuery } from "@uidotdev/usehooks";

const ServicesSkeleton = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const placeholders = Array(isSmallDevice ? 1 : 5).fill(null);

  return (
    <div className="w-full flex items-center overflow-x-scroll scrollbar-hide">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`${css.card} mx-2`}
          style={{ width: "100%", maxWidth: "320px",marginLeft: isSmallDevice && 0 }}
        >
          <div className={css.image}>
            <Skeleton className="w-full h-full rounded-sm" />
          </div>
          <div className={css.title}>
            <Skeleton className="w-36 h-4 rounded-sm" />
          </div>
          <div className={css.rating}>
            <Skeleton className="w-20 h-4 rounded-sm mt-1" />
          </div>
          <div className={css.detail}>
            <div className={css.age}>
              <Skeleton className="w-16 h-3 rounded-sm" />
            </div>
            <div className={css.time}>
              <Skeleton className="w-16 h-3 rounded-sm" />
            </div>
          </div>
          <div className={css.price} style={{ backgroundColor: "transparent",marginTop: isSmallDevice && "22px" }}>
            <Skeleton className="w-28 h-3 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;
