import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/ui/imae-placeholder";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const serviceCategories = [
  {
    id: 1,
    title: "Salon",
    image: "https://picsum.photos/seed/1/1080/1080",
  },
  {
    id: 2,
    title: "Barber",
    image: "https://picsum.photos/seed/2/1080/1080",
  },
  {
    id: 3,
    title: "Nails",
    image: "https://picsum.photos/seed/3/1080/1080",
  },
  {
    id: 4,
    title: "Spa & sauna",
    image: "https://picsum.photos/seed/4/1080/1080",
  },
  {
    id: 5,
    title: "Medspa",
    image: "https://picsum.photos/seed/5/1080/1080",
  },
  {
    id: 6,
    title: "Massage",
    image: "https://picsum.photos/seed/6/1080/1080",
  },
  {
    id: 7,
    title: "Fitness & recovery",
    image: "https://picsum.photos/seed/7/1080/1080",
  },
  {
    id: 8,
    title: "Physical therapy",
    image: "https://picsum.photos/seed/8/1080/1080",
  },
  {
    id: 9,
    title: "Health practice",
    image: "https://picsum.photos/seed/9/1080/1080",
  },
  {
    id: 10,
    title: "Tattoo & piercing",
    image: "https://picsum.photos/seed/10/1080/1080",
  },
  {
    id: 11,
    title: "Pet grooming",
    image: "https://picsum.photos/seed/11/1080/1080",
  },
  {
    id: 12,
    title: "Tanning studio",
    image: "https://picsum.photos/seed/12/1080/1080",
  },
];

// Card component with its own inView detection
const ServiceCard = ({ category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: Math.min(0.1 * (index % 6), 0.5), // Stagger by column position, max delay 0.5s
        ease: "easeOut",
      }}
      key={category.id}
      className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

      <ImagePlaceholder
        src={category.image}
        alt={category.title}
        height="100%"
        className={`object-cover h-full transition-transform duration-500 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      />

      <div className="absolute bottom-5 md:bottom-6 left-4 md:left-6 z-20">
        <h3 className="text-white text-lg md:text-xl font-semibold">{category.title}</h3>
      </div>
    </motion.div>
  );
};

const ServiceCategorySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 py-12 md:py-16 md:px-6 lg:px-8"
    >
      <motion.div
        className="text-center mb-10 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-bold heading-landing mb-4 max-w-3xl text-center mx-auto">
          All Your Services. One Seamless Platform.
        </h2>
        <p className="text-sm md:text-base max-w-3xl mx-auto text-gray-600">
          Discover, book, and manage your beauty & wellness services all in one
          place. From effortless scheduling to smart client retention tools —
          Hint helps you grow, streamline, and shine.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center mb-10 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Button
          size="lg"
          className="px-7 md:px-8 py-6 md:py-7 text-lg capitalize rounded-full font-medium"
        >
          Try Hint for Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
        {serviceCategories.map((category, index) => (
          <ServiceCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServiceCategorySection;
