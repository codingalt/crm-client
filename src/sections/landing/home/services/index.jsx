import React from "react";
import ServicesCarousel from "./carousel";
import { servicesData } from "@/data/projectData";

// Alternative data set for the second carousel
const trendingData = [
  ...servicesData.slice(5), // Use the second half of the data first
  ...servicesData.slice(0, 5), // Then the first half to ensure different ordering
];

const ServicesCarouselSection = () => {
  return (
    <>
      <ServicesCarousel
        sectionTitle="Recommended"
        data={servicesData}
        id="recommended"
      />
      <ServicesCarousel
        sectionTitle="Trending this week"
        data={trendingData}
        id="trending"
      />
    </>
  );
};

export default ServicesCarouselSection;
