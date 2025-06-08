import React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

const ServicesSkeleton = () => {
  const isXL = useMediaQuery("(min-width: 1280px)");
  const isLG = useMediaQuery("(min-width: 1024px)");
  const isSM = useMediaQuery("(min-width: 768px)");

  const placeholders = Array(isXL ? 5 : isLG ? 4 : isSM ? 3 : 3).fill(null);

  return (
    <div className="w-full grid grid-cols-[repeat(3,minmax(220px,1fr))] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
      {placeholders.map((_, index) => (
        <div
          key={index}
          className={`bg-white w-[220px] md:w-full rounded-lg overflow-hidden border border-gray-200 h-full animate-pulse ${
            index === 0
              ? "mr-2 ml-0"
              : index === placeholders.length - 1
              ? "mr-0 mx-2"
              : "mx-2"
          }`}
          style={{
            maxWidth: "320px",
            marginLeft: isSM && 0,
          }}
        >
          <div className="w-full h-[136px] md:h-36 xl:h-44 rounded-t-lg bg-gray-200"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex items-center mb-2">
              <div className="h-4 bg-gray-200 rounded w-8 mr-1"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16 ml-1"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesSkeleton;
