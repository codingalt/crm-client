import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./services.scss";
import { Star, ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { useMediaQuery } from "@uidotdev/usehooks";
import ServicesSkeleton from "./skeleton";

const ServicesCarousel = ({ data, id, desktopLength = 4, isLoading }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiper, setSwiper] = useState(null);

  // Generate unique identifiers for navigation buttons
  const prevButtonId = `swiper-button-prev-${id}`;
  const nextButtonId = `swiper-button-next-${id}`;

  return (
    <div className="relative">
      {isLoading ? (
        <ServicesSkeleton />
      ) : (
        <>
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={isSmallDevice ? 14 : 16}
            slidesPerView={"auto"}
            watchSlidesProgress={true}
            centeredSlides={true}
            centeredSlidesBounds={true}
            freeMode={true}
            grabCursor={true}
            navigation={{
              prevEl: `.${prevButtonId}`,
              nextEl: `.${nextButtonId}`,
            }}
            onSwiper={(swiperInstance) => {
              setSwiper(swiperInstance);
              setIsBeginning(swiperInstance.isBeginning);
              setIsEnd(swiperInstance.isEnd);

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
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: desktopLength,
              },
            }}
            slidesOffsetAfter={0}
            slidesOffsetBefore={0}
            className="services-carousel-swiper"
          >
            {data?.map((salon) => (
              <SwiperSlide
                key={salon.id}
                style={{ width: isSmallDevice ? "220px" : "auto" }}
              >
                <div className="bg-white rounded-md md:rounded-lg overflow-hidden border border-gray-200 h-full cursor-pointer">
                  <div className="relative h-[136px] md:h-36 xl:h-44 overflow-hidden">
                    <ImagePlaceholder
                      src={salon.image}
                      alt={salon.name}
                      className="object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
                      height="100%"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate text-subHeadingLanding mb-1">
                      {salon.name}
                    </h3>
                    <div className="flex items-center mb-1">
                      <span className="font-semibold text-subHeadingLanding mr-1">
                        {salon.rating}
                      </span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {/* <span className="text-gray-500 text-sm ml-1">
                        ({salon.reviews.toLocaleString()})
                      </span> */}
                    </div>
                    <div className="text-gray-600 flex items-center gap-1.5 text-xs mb-2.5">
                      <MapPin size={14} />
                      <p className="truncate">{salon.location}</p>
                    </div>

                    <div className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {salon.category}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          {!isBeginning && (
            <button
              onClick={() => swiper?.slidePrev()}
              className={`${prevButtonId} outline-none absolute top-1/2 left-3 -translate-y-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-gray-200 transition-all rounded-full shadow-md cursor-pointer`}
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {!isEnd && (
            <button
              onClick={() => swiper?.slideNext()}
              className={`${nextButtonId} outline-none absolute top-1/2 right-3 -translate-y-1/2 translate-x-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white hover:bg-gray-200 transition-all rounded-full shadow-md cursor-pointer`}
              aria-label="Next"
            >
              <ArrowRight size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ServicesCarousel;
