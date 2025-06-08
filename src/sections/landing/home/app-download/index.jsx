import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AppleIcon, GooglePlayIcon } from "./icons";

// Assets
import phoneMockup from "@/assets/images/landing/app-download-mockup.png";

const DownloadAppSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0 });

  return (
    <section
      ref={sectionRef}
      className="w-full py-7 pb-28 md:py-16 md:pb-48 overflow-hidden"
    >
      <div className="min-h-[800px] lg:min-h-full max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center gap-3 mb-3 md:mb-4 text-hintPrimary"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="text-lg font-medium">Available on</span>
              <motion.svg
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </motion.svg>
              <motion.svg
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <polygon points="4 20 20 12 4 4" />
                <path d="M18.5 12 4 20" />
                <path d="M4 4v16" />
              </motion.svg>
            </motion.div>

            <motion.h2
              className="text-4xl font-tartuffo max-w-3xl md:text-6xl lg:text-7xl font-bold text-headingLanding !leading-snug"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Download the Hint App Today
            </motion.h2>

            <motion.p
              className="text-xl max-w-3xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              The smartest way to stay glowing. Download and book your next
              beauty or wellness service in seconds.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 pt-1 md:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <motion.a
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all"
                >
                  <AppleIcon />
                  <div className="flex flex-col">
                    <span className="text-xs">Download on the</span>
                    <span className="text-lg font-semibold">App Store</span>
                  </div>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="#"
                  className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all"
                >
                  <GooglePlayIcon />
                  <div className="flex flex-col">
                    <span className="text-xs">GET IT ON</span>
                    <span className="text-lg font-semibold">Google Play</span>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative lg:w-1/2 flex items-center justify-center"
          >
            <div>
              <img
                src={phoneMockup}
                className="scale-110 md:scale-100"
                alt="Hint App"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
