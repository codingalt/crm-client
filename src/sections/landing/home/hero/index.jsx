import React, { useRef } from "react";
import SearchForm from "./search-form";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { motion, useInView } from "framer-motion";
import { heroImagesData } from "@/data/projectData";

const HeroSection = () => {
  const heroRef = useRef();
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  return (
    <div
      ref={heroRef}
      className="relative min-h-[660px] md:h-screen flex items-center w-full overflow-hidden"
    >
      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80" />
      <ThreeDMarquee
        className="pointer-events-none bg-black absolute inset-0 h-full w-full"
        images={heroImagesData}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative w-full z-20 max-w-5xl 2xl:max-w-6xl mx-auto pt-4 md:pt-0 px-4 md:px-6"
      >
        <div className="mb-4 text-white max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-[74px] max-w-5xl lg:text-left font-tartuffo font-bold mb-10">
            Book local beauty and wellness services in{" "}
            <span className="relative font-tartuffo z-20 inline-block rounded-xl bg-teal-500/40 px-4 py-1 text-white underline decoration-teal-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
              seconds.
            </span>{" "}
          </h1>
        </div>

        {/* Form */}
        <SearchForm />
      </motion.div>
    </div>
  );
};

export default HeroSection;
