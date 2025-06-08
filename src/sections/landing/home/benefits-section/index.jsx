import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Assets
import icon1 from "@/assets/icons/benefits-icon-box-1.svg";
import icon2 from "@/assets/icons/benefits-icon-box-2.svg";
import icon3 from "@/assets/icons/benefits-icon-box-3.svg";
import boxImage1 from "@/assets/images/landing/benefits-img-box-1.svg";
import boxImage2 from "@/assets/images/landing/benefits-img-box-2.svg";
import boxImage3 from "@/assets/images/landing/benefits-img-box-3.svg";

const BenefitCard = ({ icon, boxImage, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2, // Staggered delay based on card index
        ease: "easeOut",
      }}
      style={{ boxShadow: "2px 2px 12px 1px rgba(230, 220, 255, 0.5)" }}
      className="bg-white relative rounded-2xl flex flex-col transition duration-300"
    >
      <motion.div
        className="absolute right-0 top-0 z-0"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{
          duration: 0.7,
          delay: index * 0.2 + 0.3, // Slightly delayed after the card appears
          ease: "easeOut",
        }}
      >
        <img src={boxImage} alt="Icon" loading="lazy" />
      </motion.div>
      <div className="flex-1 p-8 z-10">
        <motion.h3
          className="sub-heading-landing mb-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2 + 0.1,
            ease: "easeOut",
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2 + 0.2,
            ease: "easeOut",
          }}
        >
          {description}
        </motion.p>
      </div>
      <div className="w-full relative h-16 bg-gray-100 rounded-b-2xl">
        <motion.div
          className="bg-white rounded-full p-1 pb-1.5 z-10 absolute -top-9 left-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: index * 0.2 + 0.3,
          }}
        >
          <div className="h-[72px] w-[72px] rounded-full bg-hintPrimary flex items-center justify-center">
            <img src={icon} alt="Icon" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  const benefitsData = [
    {
      icon: icon1,
      boxImage: boxImage1,
      title: (
        <>
          Exclusive Offers
          <br />
          Near You
        </>
      ),
      description:
        "Browse and book beauty & wellness services instantly — from your phone or laptop, 24/7.",
    },
    {
      icon: icon3,
      boxImage: boxImage3,
      title: (
        <>
          Verified Reviews
          <br />
          From Real Clients
        </>
      ),
      description:
        "Choose trusted professionals based on authentic ratings and customer feedback.",
    },
    {
      icon: icon2,
      boxImage: boxImage2,
      title: (
        <>
          No Calls,
          <br />
          No Waiting
        </>
      ),
      description:
        "Skip the phone calls — schedule, reschedule, or cancel appointments online with ease.",
    },
  ];

  return (
    <div ref={sectionRef} className="w-full py-16 pb-11 md:py-24 px-4 md:px-6">
      {/* Title Section */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-9 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h3
          className="text-hintPrimary font-semibold mb-4 uppercase"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          OUR BENEFITS
        </motion.h3>
        <motion.h2
          className="heading-landing mb-8 text-center mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          What Makes Hint the Go-To Booking Platform
        </motion.h2>
      </motion.div>

      {/* Benefits Cards Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefitsData.map((benefit, index) => (
          <BenefitCard
            key={index}
            icon={benefit.icon}
            boxImage={benefit.boxImage}
            title={benefit.title}
            description={benefit.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
