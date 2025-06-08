import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./testimonials.scss";

const testimonials = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Maecenas vel magna nec risus placerat efficitur.",
    author: "John D.",
    role: "Marketing Director",
    company: "GrowthWave",
    avatar: "JD",
    rating: 5,
  },
  {
    id: 2,
    content:
      "Praesent fringilla purus at lectus finibus, eget facilisis eros efficitur. Sed non tortor a eros finibus commodo.",
    author: "Sarah M.",
    role: "Product Manager",
    company: "TechFusion",
    avatar: "SM",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Donec dignissim lacus ac lorem sagittis finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.",
    author: "Michael R.",
    role: "Independent Designer",
    company: "Self-employed",
    avatar: "MR",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Curabitur eleifend bibendum nisi, sit amet consectetur massa lacinia nec. Praesent ullamcorper justo ut neque cursus.",
    author: "Emily B.",
    role: "Operations Director",
    company: "Innovate Inc",
    avatar: "EB",
    rating: 5,
  },
  {
    id: 5,
    content:
      "Nullam mattis erat nec ligula efficitur, a bibendum eros tempus. Vivamus consectetur, nibh non vestibulum aliquet.",
    author: "David N.",
    role: "Financial Analyst",
    company: "Capital Insights",
    avatar: "DN",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Render testimonial card
  const renderTestimonialCard = (testimonial) => (
    <div key={testimonial.id} className="rounded-xl">
      <div
        className="p-5 md:p-8 h-full transition-all rounded-xl hover:bg-gray-50"
        style={{ boxShadow: "2px 2px 12px 1px rgba(230, 220, 255, 0.5)" }}
      >
        {/* Star Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-[#6A6A6A] mb-6 text-sm md:text-base">&quot;{testimonial.content}&quot;</p>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 shrink-0 rounded-full bg-black flex items-center justify-center">
            <span className="font-medium text-white">
              {testimonial.avatar}
            </span>
          </div>
          <div>
            <div className="text-sm md:text-base font-medium text-headingLanding">
              {testimonial.author}
            </div>
            <div className="text-xs text-hintPrimary">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      className="py-16 pb-16 md:py-24 px-4 md:px-6 md:pb-28 relative testimonial-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="max-w-6xl mx-auto text-center mb-9 md:mb-16">
          <h3 className="text-hintPrimary font-semibold mb-4 uppercase">
            OUR TESTIMONIALS
          </h3>
          <h2 className="heading-landing mb-8">
            What They’re Talking
            <br className="hidden md:block" />
            About Us
          </h2>
        </div>

        {/* Desktop Testimonials Carousel */}
        <div className="hidden md:block relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={3}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={{
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                {renderTestimonialCard(testimonial)}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="relative px-4">
            <Button
              ref={prevRef}
              variant="outline"
              size="icon"
              className="absolute z-10 right-8 top-1/2 transform -translate-y-1/2 -translate-x-4 text-[#1D1D1F] bg-white border border-gray-200 rounded-full shadow-sm"
            >
              <ArrowLeft size={20} />
            </Button>
            <Button
              ref={nextRef}
              variant="outline"
              size="icon"
              className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 translate-x-4 text-[#1D1D1F] bg-white border border-gray-200 rounded-full shadow-sm"
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView="auto"
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} style={{ width: "340px" }}>
                {renderTestimonialCard(testimonial)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
