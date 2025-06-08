import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./services.scss";
import { Star, ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { useMediaQuery } from "@uidotdev/usehooks";

const ServicesCarousel = ({ sectionTitle = "Recommended", data, id }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swiper, setSwiper] = useState(null);

  // Generate unique identifiers for navigation buttons
  const prevButtonId = `swiper-button-prev-${id}`;
  const nextButtonId = `swiper-button-next-${id}`;

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto py-7 md:py-11 px-4 md:px-6">
      <h2 className="text-xl xl:text-4xl font-semibold text-headingLanding mb-4 md:mb-6">
        {sectionTitle}
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <SkeletonCard key={item} />
          ))}
        </div>
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
                slidesPerView: 4,
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
                  <div className="relative h-[136px] md:h-48 overflow-hidden">
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
                      <span className="text-gray-500 text-sm ml-1">
                        ({salon.reviews.toLocaleString()})
                      </span>
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

// Skeleton Card
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 h-full animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
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
);
