import React, { useState } from "react";
import "./category.scss";
import { useNavigate } from "react-router-dom";
import { Button, Skeleton } from "@nextui-org/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import slugify from "slugify";

const Category = ({
  data,
  isLoading,
  error,
  refetchCategories,
  dir = "ltr",
}) => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  // Navigation state
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Navigation button refs instead of IDs
  const prevButtonRef = React.useRef(null);
  const nextButtonRef = React.useRef(null);

  return (
    <>
      <div className="relative w-full min-h-[150px] md:px-[50px] mt-0 md:mt-7">
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <>
            {data && data?.length > 0 && (
              <div className="relative categories-container">
                <Swiper
                  modules={[Navigation, FreeMode]}
                  spaceBetween={isSmallDevice ? 2 : 24}
                  slidesPerView={"auto"}
                  freeMode={true}
                  direction="horizontal"
                  navigation={{
                    prevEl: prevButtonRef.current,
                    nextEl: nextButtonRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    // Assign navigation elements on init
                    swiper.params.navigation.prevEl = prevButtonRef.current;
                    swiper.params.navigation.nextEl = nextButtonRef.current;
                  }}
                  onSwiper={(swiperInstance) => {
                    setSwiper(swiperInstance);
                    setIsBeginning(swiperInstance.isBeginning);
                    setIsEnd(swiperInstance.isEnd);

                    // Force update after a delay to ensure correct sizing
                    setTimeout(() => {
                      swiperInstance.update();
                      window.dispatchEvent(new Event("resize"));
                    }, 100);
                  }}
                  onSlideChange={(swiperInstance) => {
                    setIsBeginning(swiperInstance.isBeginning);
                    setIsEnd(swiperInstance.isEnd);
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: "auto",
                      spaceBetween: 8,
                    },
                    600: {
                      slidesPerView: "auto",
                      spaceBetween: 12,
                    },
                    900: {
                      slidesPerView: "auto",
                      spaceBetween: 24,
                    },
                  }}
                  className="categories-dashboard"
                  style={{ paddingLeft: isSmallDevice ? "0px" : "3px" }}
                >
                  {data?.map((item, index) => (
                    <SwiperSlide
                      key={item.id}
                      className="flex justify-center items-center rounded-sm"
                    >
                      <div
                        className="item-category transition-all"
                        onClick={() =>
                          navigate(
                            `/categories/${slugify(item.name, {
                              lower: true,
                            })}/${item.id}`
                          )
                        }
                      >
                        <div className="image-category">
                          <ImagePlaceholder
                            src={
                              import.meta.env.VITE_CATEGORY_IMAGE + item.image
                            }
                            rounded="md"
                            width="38px"
                            height="38px"
                            className="rounded-md w-full h-[96px] md:w-[38px] md:h-[38px]"
                          />
                        </div>
                        <p>{item.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom navigation buttons */}
                {!isBeginning && (
                  <button
                    ref={prevButtonRef}
                    onClick={() => swiper?.slidePrev()}
                    className={`outline-none absolute top-1/2 ${
                      dir === "rtl" ? "right-8" : "left-8"
                    } -translate-y-1/2 ${
                      dir === "rtl" ? "translate-x-1/2" : "-translate-x-1/2"
                    } z-10 hidden lg:flex items-center justify-center w-11 h-11 bg-white border shadow-2xl rounded-full text-xl text-default-600 transition-opacity hover:bg-gray-50 cursor-pointer`}
                    aria-label={
                      dir === "rtl" ? "Next categories" : "Previous categories"
                    }
                  >
                    {dir === "rtl" ? <ArrowRight /> : <ArrowLeft />}
                  </button>
                )}

                {!isEnd && (
                  <button
                    ref={nextButtonRef}
                    onClick={() => swiper?.slideNext()}
                    className={`outline-none absolute top-1/2 ${
                      dir === "rtl" ? "left-8" : "right-8"
                    } -translate-y-1/2 ${
                      dir === "rtl" ? "-translate-x-1/2" : "translate-x-1/2"
                    } z-10 hidden lg:flex items-center justify-center w-11 h-11 bg-white border shadow-2xl rounded-full text-xl text-default-600 transition-opacity hover:bg-gray-50 cursor-pointer`}
                    aria-label={
                      dir === "rtl" ? "Previous categories" : "Next categories"
                    }
                  >
                    {dir === "rtl" ? <ArrowLeft /> : <ArrowRight />}
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Show Error If data fails to load */}
      {!isLoading && error && (
        <div className="px-4 mx-auto w-full h-[130px] flex flex-col gap-2 items-center">
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
            onClick={refetchCategories}
          >
            Try again
          </Button>
        </div>
      )}
    </>
  );
};

export default Category;

const CategorySkeleton = () => {
  return (
    <div className="w-full flex items-center overflow-hidden gap-3 py-4 md:py-0">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 px-0 min-w-[100px] md:min-w-[140px] lg:min-w-[150px] xl:min-w-[160px]"
        >
          <Skeleton
            disableAnimation
            className="rounded-2xl h-[90px] lg:h-[135px] xl:h-[142px]"
          >
            <div className="w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton
            disableAnimation
            className="block lg:hidden rounded-2xl w-[75%] lg:w-[84%] h-2 mx-auto"
          >
            <div className="rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton
            disableAnimation
            className="block lg:hidden rounded-2xl w-[75%] lg:w-[84%] h-2 mx-auto"
          >
            <div className="rounded-lg bg-secondary"></div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
};
