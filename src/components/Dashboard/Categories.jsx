import React, { useEffect, useState } from "react";
import css from "./Dashboard.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@nextui-org/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ImageComponent from "../ui/Image/ImageComponent";

const Categories = ({ data, isLoading, error, refetchCategories }) => {
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
    <>
      <div className="lg:overflow-x-auto lg:scroll-x lg:scrollbar-hide lg:snap-mandatory lg:snap-x lg:scroll-smooth">
        <div
          className={`${css.categories} w-full scrollbar-hide`}
          style={error ? { height: "auto", minHeight: 0 } : {}}
        >
          {isLoading
            ? Array.from({ length: value }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 px-[1px] md:px-[6px]"
                >
                  <Skeleton
                    disableAnimation
                    className="rounded-2xl h-[96px] lg:h-[135px]"
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
                  className={`flex justify-center items-center md:p-1.5`}
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

      {/* Show Error If data fails to load  */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full h-[130px] flex flex-col gap-2 items-center">
          <p className="font-medium text-[15px] text-[#01abab]">
            Let's try that again.
          </p>
          <span className="px-6 text-xs text-default-600 text-center max-w-xs">
            OOps! Something went wrong. We couldn't fetch the data.
          </span>
          <Button
            size="sm"
            radius="sm"
            className="mt-2 px-6 text-white bg-[#01abab]"
            onClick={refetchCategories}
          >
            Try again
          </Button>
        </div>
      )}
    </>
  );
};

export default Categories;
